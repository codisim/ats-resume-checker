"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

import { SectionShell } from "./section-shell"

type JobDescriptionPanelProps = {
  hasResume: boolean
  resumeFileName?: string
  isAnalyzing?: boolean
  onAnalyze: (jobDescription: string) => Promise<void> | void
}

export function JobDescriptionPanel({
  hasResume,
  resumeFileName,
  isAnalyzing = false,
  onAnalyze,
}: JobDescriptionPanelProps) {
  const [jobDescription, setJobDescription] = useState("")
  const characterCount = jobDescription.length

  return (
    <SectionShell
      badge="2"
      title="Paste Job Description"
      action={<span className="text-sm text-slate-400">{characterCount} / 5000</span>}
    >
      <div className="flex h-full flex-col">
        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          className="min-h-[300px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
          placeholder="Paste the job description here..."
        />
        <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            {hasResume
              ? `Resume ready${resumeFileName ? `: ${resumeFileName}` : ""}.`
              : "Upload your resume first, then paste the job description."}
          </p>
          <span>{characterCount} / 5000</span>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            onClick={() => onAnalyze(jobDescription)}
            disabled={!hasResume || isAnalyzing || !jobDescription.trim()}
            className="h-11 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 text-white shadow-lg shadow-violet-500/20 hover:from-violet-400 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="size-4" />
              {isAnalyzing ? "Analyzing..." : "Analyze My Resume"}
            </span>
          </Button>
        </div>
      </div>
    </SectionShell>
  )
}
