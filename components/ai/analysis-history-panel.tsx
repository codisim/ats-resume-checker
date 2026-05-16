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
        tone === "good" && "border-emerald-100 bg-emerald-50",
        tone === "average" && "border-amber-100 bg-amber-50",
        tone === "low" && "border-rose-100 bg-rose-50"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
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
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/85 px-6 py-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-violet-50 text-violet-600">
          <Gauge className="size-7" />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-slate-900">
          No history yet
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
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
            className="flex w-full items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/95 px-5 py-5 text-left shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_24px_70px_rgba(124,58,237,0.12)]"
          >
            <div className="flex min-w-0 items-start gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl border-4 border-slate-100 text-sm font-semibold text-slate-900">
                {item.atsScore}%
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-slate-900">
                  {item.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
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
                  item.tone === "good" && "border-emerald-100 bg-emerald-50 text-emerald-700",
                  item.tone === "average" && "border-amber-100 bg-amber-50 text-amber-700",
                  item.tone === "low" && "border-rose-100 bg-rose-50 text-rose-700"
                )}
              >
                {item.label}
              </span>
              <Sparkles className="size-4 text-slate-400" />
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
                  <SheetTitle className="text-2xl font-semibold text-slate-900">
                    {selected.title}
                  </SheetTitle>
                  <p className="text-sm text-slate-500">
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
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <p className="text-sm font-semibold text-emerald-800">Matched Skills</p>
                  <p className="mt-2 text-sm leading-6 text-emerald-900">
                    {selected.matchedSkills.join(", ") || "None detected"}
                  </p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                  <p className="text-sm font-semibold text-amber-800">Missing Skills</p>
                  <p className="mt-2 text-sm leading-6 text-amber-900">
                    {selected.missingSkills.join(", ") || "None detected"}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                      Improved Summary
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full px-3 text-slate-500 hover:bg-violet-50 hover:text-violet-700"
                      onClick={() => handleCopy(selected.improvedSummary, "summary")}
                    >
                      <Copy className="mr-1.5 size-3.5" />
                      {copiedKey === "summary" ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selected.improvedSummary || "No improved summary saved."}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Job Description
                  </p>
                  <p className="mt-2 max-h-56 overflow-y-auto text-sm leading-6 text-slate-600">
                    {selected.jobDescription || "No job description saved."}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Strengths</p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                    {selected.strengths.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-1 size-4 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Weaknesses</p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                    {selected.weaknesses.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-1 size-4 text-rose-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">
                    AI Suggestions
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full px-3 text-slate-500 hover:bg-violet-50 hover:text-violet-700"
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
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-3 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-2 size-1.5 rounded-full bg-violet-500" />
                      <span className="flex-1">{item}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7 shrink-0 rounded-full text-slate-400 hover:bg-violet-50 hover:text-violet-700"
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
                  <p className="mt-2 text-sm text-slate-500">
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
