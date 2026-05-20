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
      action={<span className="text-sm text-muted-foreground">{characterCount} / 5000</span>}
    >
      <div className="flex h-full flex-col">
        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          className="min-h-[300px] flex-1 rounded-2xl border border-border bg-background px-4 py-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
          placeholder="Paste the job description here..."
        />
        <div className="mt-3 flex items-center justify-between gap-4 text-sm text-muted-foreground">
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
            className="h-11 cursor-pointer rounded-xl bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/20 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
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
