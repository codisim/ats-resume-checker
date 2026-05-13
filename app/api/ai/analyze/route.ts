import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { getOrCreateDbUser, getWeekStart } from "@/lib/auth-user"
import {
  calculateLocalAnalysis,
  generateAiRewrite,
} from "@/lib/ai/analysis"

export const runtime = "nodejs"

const DEFAULT_WEEKLY_LIMIT = 7

type AnalyzeBody = {
  resumeId: string
  resumeText?: string
  jobDescription: string
  jobTitle?: string
  company?: string
}

function cleanText(value: string) {
  return value.replace(/\r\n/g, "\n").trim()
}

export async function POST(req: Request) {
  try {
    const dbUser = await getOrCreateDbUser()
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = (await req.json()) as AnalyzeBody
    const resumeId = body.resumeId?.trim()
    const jobDescription = cleanText(body.jobDescription || "")
    const jobTitle = body.jobTitle?.trim() || null
    const company = body.company?.trim() || null

    if (!resumeId || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required." },
        { status: 400 }
      )
    }

    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId: dbUser.id,
      },
    })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found." }, { status: 404 })
    }

    const effectiveResumeText = cleanText(body.resumeText || resume.rawText || "")

    if (!effectiveResumeText) {
      return NextResponse.json(
        { error: "Resume text is missing. Please upload the file again." },
        { status: 400 }
      )
    }

    const weeklyLimit = await getWeeklyLimit(dbUser.id)
    const currentWeekStart = getWeekStart()
    const usage = await prisma.usage.findFirst({
      where: {
        userId: dbUser.id,
        weekStart: currentWeekStart,
      },
    })

    const usedCount = usage?.count ?? 0

    if (usedCount >= weeklyLimit) {
      return NextResponse.json(
        {
          error: "Weekly usage limit reached.",
          usedCount,
          weeklyLimit,
        },
        { status: 429 }
      )
    }

    const analysis = calculateLocalAnalysis({
      resumeText: effectiveResumeText,
      jobDescription,
    })

    const job = await prisma.jobDescription.create({
      data: {
        userId: dbUser.id,
        title: jobTitle,
        company,
        description: jobDescription,
      },
    })

    const aiRewrite = await generateAiRewrite({
      resumeText: effectiveResumeText,
      jobDescription,
      analysis,
    })

    const record = await prisma.analysis.create({
      data: {
        userId: dbUser.id,
        resumeId: resume.id,
        jobId: job.id,
        atsScore: analysis.atsScore,
        matchPercent: analysis.matchPercent,
        missingSkills: analysis.missingSkills,
        strengths: analysis.matchedSkills,
        weaknesses: analysis.weaknesses,
        suggestions: aiRewrite.recruiterSuggestions,
        improvedSummary: aiRewrite.improvedSummary,
      },
    })

    if (usage) {
      await prisma.usage.update({
        where: { id: usage.id },
        data: {
          count: usedCount + 1,
          weekStart: currentWeekStart,
        },
      })
    } else {
      await prisma.usage.create({
        data: {
          userId: dbUser.id,
          count: usedCount + 1,
          weekStart: currentWeekStart,
        },
      })
    }

    return NextResponse.json({
      analysisId: record.id,
      resumeId: resume.id,
      jobId: job.id,
      atsScore: analysis.atsScore,
      matchPercent: analysis.matchPercent,
      matchedSkills: analysis.matchedSkills,
      missingSkills: analysis.missingSkills,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: aiRewrite.recruiterSuggestions,
      improvedSummary: aiRewrite.improvedSummary,
      atsOptimizedRewrite: aiRewrite.atsOptimizedRewrite,
      bulletPoints: aiRewrite.bulletPoints,
      weeklyUsage: {
        used: usedCount + 1,
        limit: weeklyLimit,
      },
    })
  } catch (error) {
    console.error("Failed to analyze resume:", error)
    return NextResponse.json(
      { error: "Could not analyze the resume." },
      { status: 500 }
    )
  }
}

async function getWeeklyLimit(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: "ACTIVE",
    },
    include: {
      plan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return subscription?.plan.weeklyLimit ?? DEFAULT_WEEKLY_LIMIT
}
