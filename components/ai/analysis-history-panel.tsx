"use client"

import { useState } from "react"
import {
  Building2,
  Check,
  Clock3,
  Copy,
  FileText,
  Gauge,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export type AnalysisHistoryItem = {
  id: string
  title: string
  company: string | null
  resumeFileName: string | null
  jobDescription: string
  date: string
  time: string
  atsScore: number
  matchPercent: number
  label: string
  tone: "good" | "average" | "low"
  matchedSkills: string[]
  missingSkills: string[]
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  improvedSummary: string
}

type AnalysisHistoryPanelProps = {
  analyses: AnalysisHistoryItem[]
}

function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text)
}

function ScoreBadge({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "good" | "average" | "low"
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3",
        tone === "good" && "border-success/20 bg-success/10",
        tone === "average" && "border-warning/20 bg-warning/10",
        tone === "low" && "border-danger/20 bg-danger/10"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  )
}

export function AnalysisHistoryPanel({ analyses }: AnalysisHistoryPanelProps) {
  const [selected, setSelected] = useState<AnalysisHistoryItem | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = async (text: string, key: string) => {
    try {
      await copyToClipboard(text)
      setCopiedKey(key)
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current))
      }, 1400)
    } catch {
      setCopiedKey(null)
    }
  }

  if (analyses.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card/85 px-6 py-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Gauge className="size-7" />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-foreground">
          No history yet
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Run your first resume analysis and it will appear here with a detail
          view.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4">
        {analyses.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className="flex w-full items-center justify-between gap-4 rounded-3xl border border-border bg-card/95 px-5 py-5 text-left shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_24px_70px_rgba(124,58,237,0.12)]"
          >
            <div className="flex min-w-0 items-start gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl border-4 border-secondary text-sm font-semibold text-foreground">
                {item.atsScore}%
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-foreground">
                  {item.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="size-3.5" />
                    {item.company || "No company"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-3.5" />
                    {item.date} • {item.time}
                  </span>
                  {item.resumeFileName && (
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="size-3.5" />
                      {item.resumeFileName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  item.tone === "good" && "border-success/20 bg-success/10 text-success",
                  item.tone === "average" && "border-warning/20 bg-warning/10 text-warning-foreground",
                  item.tone === "low" && "border-danger/20 bg-danger/10 text-danger"
                )}
              >
                {item.label}
              </span>
              <Sparkles className="size-4 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          {selected && (
            <div className="space-y-6 pb-8 pr-8">
              <SheetHeader className="px-0 pt-4">
                <div className="space-y-2">
                  <SheetTitle className="text-2xl font-semibold text-foreground">
                    {selected.title}
                  </SheetTitle>
                  <p className="text-sm text-muted-foreground">
                    {selected.company || "No company"} • {selected.date} •{" "}
                    {selected.time}
                  </p>
                </div>
              </SheetHeader>

              <div className="grid gap-3 sm:grid-cols-2">
                <ScoreBadge label="ATS Score" value={`${selected.atsScore}%`} tone={selected.tone} />
                <ScoreBadge label="Match Percent" value={`${selected.matchPercent}%`} tone={selected.tone} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-success/20 bg-success/10 p-4">
                  <p className="text-sm font-semibold text-success">Matched Skills</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {selected.matchedSkills.join(", ") || "None detected"}
                  </p>
                </div>
                <div className="rounded-2xl border border-warning/20 bg-warning/10 p-4">
                  <p className="text-sm font-semibold text-warning">Missing Skills</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {selected.missingSkills.join(", ") || "None detected"}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-secondary p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">
                      Improved Summary
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full px-3 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                      onClick={() => handleCopy(selected.improvedSummary, "summary")}
                    >
                      <Copy className="mr-1.5 size-3.5" />
                      {copiedKey === "summary" ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {selected.improvedSummary || "No improved summary saved."}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-secondary p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Job Description
                  </p>
                  <p className="mt-2 max-h-56 overflow-y-auto text-sm leading-6 text-muted-foreground">
                    {selected.jobDescription || "No job description saved."}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">Strengths</p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                    {selected.strengths.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-1 size-4 text-success" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Weaknesses</p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                    {selected.weaknesses.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-1 size-4 text-danger" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">
                    AI Suggestions
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full px-3 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                    onClick={() =>
                      handleCopy(
                        selected.suggestions.map((item) => `- ${item}`).join("\n"),
                        "suggestions-all"
                      )
                    }
                    disabled={selected.suggestions.length === 0}
                  >
                    <Copy className="mr-1.5 size-3.5" />
                    {copiedKey === "suggestions-all" ? "Copied" : "Copy all"}
                  </Button>
                </div>
                <ul className="mt-3 space-y-2">
                  {selected.suggestions.map((item, index) => (
                  <li
                      key={`${item}-${index}`}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/80 px-3 py-3 text-sm leading-6 text-foreground"
                    >
                      <span className="mt-2 size-1.5 rounded-full bg-primary" />
                      <span className="flex-1">{item}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7 shrink-0 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                        onClick={() => handleCopy(item, `suggestion-${index}`)}
                      >
                        {copiedKey === `suggestion-${index}` ? (
                          <Check className="size-3.5" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
                {selected.suggestions.length === 0 && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    No suggestions were saved for this analysis.
                  </p>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
