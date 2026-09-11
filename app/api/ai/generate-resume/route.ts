import { NextResponse } from "next/server"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { getOrCreateDbUser } from "@/lib/auth-user"

export const runtime = "nodejs"

const generateResumeSchema = z.object({
  analysisId: z.string().trim().min(1).optional().or(z.literal("")),
  resumeId: z.string().trim().min(1).optional().or(z.literal("")),
  // The rewrite content produced by /api/ai/analyze (client already has it)
  atsOptimizedRewrite: z.string().trim().min(50),
  improvedSummary: z.string().trim().optional().or(z.literal("")),
  bulletPoints: z.array(z.string()).optional(),
  jobTitle: z.string().trim().max(160).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
})

function buildGeneratedResumeText({
  atsOptimizedRewrite,
  improvedSummary,
  bulletPoints,
}: {
  atsOptimizedRewrite: string
  improvedSummary?: string
  bulletPoints?: string[]
}) {
  const sections: string[] = []

  if (improvedSummary) {
    sections.push("PROFESSIONAL SUMMARY", improvedSummary.trim(), "")
  }

  sections.push(atsOptimizedRewrite.trim())

  if (bulletPoints && bulletPoints.length > 0) {
    sections.push("", "KEY HIGHLIGHTS", ...bulletPoints.map((b) => `- ${b.trim()}`))
  }

  return sections.join("\n")
}

export async function POST(request: Request) {
  try {
    const dbUser = await getOrCreateDbUser()
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    const parsed = generateResumeSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            "Invalid payload. An ATS-optimized rewrite is required.",
        },
        { status: 400 }
      )
    }

    const input = parsed.data
    const analysisId = input.analysisId || null
    const sourceResumeId = input.resumeId || null

    // Verify the analysis belongs to this user (when provided)
    const analysis = analysisId
      ? await prisma.analysis.findFirst({
          where: {
            id: analysisId,
            userId: dbUser.id,
          },
          include: {
            resume: {
              select: { id: true, fileName: true },
            },
            job: {
              select: { title: true, company: true },
            },
          },
        })
      : null

    if (analysisId && !analysis) {
      return NextResponse.json(
        { error: "Analysis not found." },
        { status: 404 }
      )
    }

    // Build a readable file name for the generated resume
    const baseName =
      input.jobTitle ||
      analysis?.job?.title ||
      analysis?.resume?.fileName?.replace(/\.(pdf|docx)$/i, "") ||
      "resume"
    const safeBase = baseName.replace(/\.(pdf|docx|txt)$/i, "").replace(/[<>:"/\\|?*]/g, "-").trim() || "resume"
    const fileName = `${safeBase} (ATS Optimized).pdf`

    const generatedText = buildGeneratedResumeText({
      atsOptimizedRewrite: input.atsOptimizedRewrite,
      improvedSummary: input.improvedSummary || undefined,
      bulletPoints: input.bulletPoints,
    })

    // Save the generated resume as a new Resume record
    const generatedResume = await prisma.resume.create({
      data: {
        userId: dbUser.id,
        fileUrl: "generated://ats-optimized",
        fileName,
        rawText: generatedText,
      },
    })

    // Verify the source resume ownership if provided (informational only)
    if (sourceResumeId) {
      await prisma.resume.findFirst({
        where: { id: sourceResumeId, userId: dbUser.id },
        select: { id: true },
      })
    }

    return NextResponse.json({
      success: true,
      generatedResumeId: generatedResume.id,
      fileName: generatedResume.fileName,
      resumeText: generatedText,
      sourceAnalysisId: analysisId,
      message: "Updated resume generated and saved to your resume library.",
    })
  } catch (error) {
    console.error("Failed to generate updated resume:", error)
    return NextResponse.json(
      { error: "Could not generate the updated resume." },
      { status: 500 }
    )
  }
}
