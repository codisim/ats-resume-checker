"use client";

import { useState } from "react";
import { JobDescriptionPanel } from "./job-description-panel";
import { RecentAnalysis } from "./recent-analysis";
import { UploadResumePanel, type ExtractedResume } from "./upload-resume-panel";

export type AiAnalysisResult = {
  analysisId: string
  resumeId: string
  generatedResumeId?: string
  jobId: string
  jobTitle?: string
  company?: string | null
  atsScore: number
  matchPercent: number
  matchedSkills: string[]
  missingSkills: string[]
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  improvedSummary: string
  atsOptimizedRewrite: string
  bulletPoints: string[]
  weeklyUsage: {
    used: number
    limit: number
  }
}

async function downloadResumePdf(resumeId: string, fileName?: string) {
  const response = await fetch(`/api/resumes/${resumeId}/download`)
  if (!response.ok) {
    throw new Error("Could not download the PDF.")
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = fileName?.replace(/\.(txt|docx)$/i, ".pdf") || "ats-resume.pdf"
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}

export function AnalysisComposer() {
  const [resume, setResume] = useState<ExtractedResume | null>(null)
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResumeReady = (nextResume: ExtractedResume) => {
    setResume(nextResume)
    setAnalysis(null)
    setError(null)
  }

  const handleAnalyze = async (
    jobDescription: string,
    meta?: { jobTitle?: string; company?: string }
  ) => {
    if (!resume) {
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client": "web",
        },
        body: JSON.stringify({
          resumeId: resume.resumeId,
          resumeText: resume.text,
          jobDescription,
          jobTitle: meta?.jobTitle,
          company: meta?.company,
        }),
      });

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to analyze resume.")
      }

      setAnalysis(payload as AiAnalysisResult)
    } catch (analyzeError) {
      setError(
        analyzeError instanceof Error
          ? analyzeError.message
          : "Something went wrong during analysis."
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGenerateResume = async () => {
    if (!analysis) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client": "web",
        },
        body: JSON.stringify({
          analysisId: analysis.analysisId,
          resumeId: analysis.resumeId,
          atsOptimizedRewrite: analysis.atsOptimizedRewrite,
          improvedSummary: analysis.improvedSummary,
          bulletPoints: analysis.bulletPoints,
          jobTitle: analysis.jobTitle,
          company: analysis.company,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to generate updated resume.")
      }

      const generatedResumeId = payload.generatedResumeId as string
      setAnalysis({
        ...analysis,
        generatedResumeId,
      })
      await downloadResumePdf(generatedResumeId, payload.fileName)
    } catch (generateError) {
      setError(
        generateError instanceof Error
          ? generateError.message
          : "Something went wrong during resume generation."
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
      <UploadResumePanel onResumeReady={handleResumeReady} />
      <JobDescriptionPanel
        hasResume={Boolean(resume)}
        resumeFileName={resume?.fileName}
        isAnalyzing={isAnalyzing}
        onAnalyze={handleAnalyze}
      />

      <div className="xl:col-span-2">
        <RecentAnalysis
          analysis={analysis}
          error={error}
          onGenerateResume={analysis ? handleGenerateResume : undefined}
          isGenerating={isAnalyzing}
        />
      </div>
    </div>
  )
}
