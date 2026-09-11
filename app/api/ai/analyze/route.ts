import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { getOrCreateDbUser, getWeekStart } from "@/lib/auth-user"
import {
  calculateLocalAnalysis,
  generateAiRewrite,
} from "@/lib/ai/analysis"
import { inferJobFromDescription } from "@/lib/infer-job"
import { notifySuccessfulAnalysis } from "@/lib/discord"
import { headers } from "next/headers"

export const runtime = "nodejs"

const DEFAULT_WEEKLY_LIMIT = 7

type AnalyzeBody = {
  resumeId?: string | null
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

    const body = (await req.json()) as AnalyzeBody
    const resumeId = body.resumeId?.trim() || null
    const jobDescription = cleanText(body.jobDescription || "")
    const inferred = inferJobFromDescription(jobDescription, {
      title: body.jobTitle,
      company: body.company,
    })
    const jobTitle = inferred.title
    const company = inferred.company

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      )
    }

    const effectiveResumeText = cleanText(body.resumeText || "")

    if (!effectiveResumeText) {
      return NextResponse.json(
        { error: "Resume text is missing. Please upload the file again." },
        { status: 400 }
      )
    }

    const canPersist = Boolean(dbUser)
    const weeklyLimit = canPersist ? await getWeeklyLimit(dbUser!.id) : DEFAULT_WEEKLY_LIMIT
    const currentWeekStart = canPersist ? getWeekStart() : null
    const usage = canPersist
      ? await prisma.usage.findFirst({
          where: {
            userId: dbUser!.id,
            weekStart: currentWeekStart!,
          },
        })
      : null

    const usedCount = usage?.count ?? 0

    if (canPersist && usedCount >= weeklyLimit) {
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

    const aiRewrite = await generateAiRewrite({
      resumeText: effectiveResumeText,
      jobDescription,
      analysis,
    })

    const ensuredResume = canPersist
      ? await ensureResumeRecord({
          dbUserId: dbUser!.id,
          resumeId,
          fileName: `${jobTitle}.pdf`,
          extractedText: effectiveResumeText,
        })
      : null

    const job = canPersist
      ? await prisma.jobDescription.create({
          data: {
            userId: dbUser!.id,
            title: jobTitle,
            company,
            description: jobDescription,
          },
        })
      : null

    const record = canPersist
      ? await prisma.analysis.create({
          data: {
            userId: dbUser!.id,
            resumeId: ensuredResume!.id,
            jobId: job!.id,
            atsScore: analysis.atsScore,
            matchPercent: analysis.matchPercent,
            missingSkills: analysis.missingSkills,
            strengths: analysis.matchedSkills,
            weaknesses: analysis.weaknesses,
            suggestions: aiRewrite.recruiterSuggestions,
            improvedSummary: aiRewrite.improvedSummary,
          },
        })
      : null

    if (canPersist) {
      if (usage) {
        await prisma.usage.update({
          where: { id: usage.id },
          data: {
            count: usedCount + 1,
            weekStart: currentWeekStart!,
          },
        })
      } else {
        await prisma.usage.create({
          data: {
            userId: dbUser!.id,
            count: usedCount + 1,
            weekStart: currentWeekStart!,
          },
        })
      }
    }

    if (canPersist) {
      const headerList = await headers()
      const source = headerList.get("x-client")?.toLowerCase() === "mobile" ? "mobile" : "web"
      void notifySuccessfulAnalysis({
        name: dbUser!.name,
        email: dbUser!.email,
        jobTitle,
        atsScore: analysis.atsScore,
        source,
      })
    }

    return NextResponse.json({
      analysisId: record?.id ?? "",
      resumeId: ensuredResume?.id ?? resumeId ?? "",
      jobId: job?.id ?? "",
      jobTitle,
      company,
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
        used: canPersist ? usedCount + 1 : usedCount,
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

async function ensureResumeRecord({
  dbUserId,
  resumeId,
  fileName,
  extractedText,
}: {
  dbUserId: string
  resumeId: string | null
  fileName: string
  extractedText: string
}) {
  const resume =
    resumeId
      ? await prisma.resume.findFirst({
          where: {
            id: resumeId,
            userId: dbUserId,
          },
        })
      : null

  return (
    resume ??
    (await prisma.resume.create({
      data: {
        userId: dbUserId,
        fileUrl: "local://uploaded",
        fileName,
        rawText: extractedText,
      },
    }))
  )
}
