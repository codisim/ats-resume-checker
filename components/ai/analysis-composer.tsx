"use client";

import { useState } from "react";
import { JobDescriptionPanel } from "./job-description-panel";
import { UploadResumePanel, type ExtractedResume } from "./upload-resume-panel";

export type AiAnalysisResult = {
  analysisId: string
  resumeId: string
  jobId: string
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

  const handleAnalyze = async (jobDescription: string) => {
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
        },
        body: JSON.stringify({
          resumeId: resume.resumeId,
          resumeText: resume.text,
          jobDescription,
        }),
      }

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
        <RecentAnalysis analysis={analysis} error={error} />
      </div>
    </div>
  )
}