"use client"

import { useState } from "react"
import { CircleGauge, FileText } from "lucide-react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type RecentAnalysisProps = {
  analysis?: {
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
  } | null
  error?: string | null
}


export function RecentAnalysis({ analysis, error }: RecentAnalysisProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current))
      }, 1400)
    } catch {
      setCopiedKey(null)
    }
  }

  const copyList = async (items: string[], key: string) => {
    await copyText(items.map((item) => `- ${item}`).join("\n"), key)
  }

  if (error) {
    return (
      <Card className="border-rose-200 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between border-b border-rose-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-7 place-items-center rounded-full bg-rose-50 text-rose-600">
              <CircleGauge className="size-4" />
            </div>
            <CardTitle className="text-lg font-semibold text-black">
              Recent Analysis
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-10 text-sm text-rose-700">
          {error}
        </CardContent>
      </Card>
    )
  }

  if (analysis) {
    const improvedSummaryText = analysis.improvedSummary?.trim() || ""
    const bulletPointsText = analysis.bulletPoints.join("\n")

    return (
      <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-7 place-items-center rounded-full bg-violet-50 text-violet-600">
              <CircleGauge className="size-4" />
            </div>
            <CardTitle className="text-lg font-semibold text-black">
              Recent Analysis
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">ATS Score</p>
              <p className={`mt-1 text-3xl font-semibold ${analysis.atsScore < 40 ? "text-red-600" : "text-slate-900"}`}>
                {analysis.atsScore}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Match Percent</p>
              <p className={`mt-1 text-3xl font-semibold ${analysis.matchPercent <= 40
                  ? "text-red-600"
                  : analysis.matchPercent <= 70
                    ? "text-amber-500"
                    : "text-green-600"
                }`}>
                {analysis.matchPercent}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Matched Skills</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {analysis.matchedSkills.length}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
              <p className="text-sm font-semibold text-emerald-800">Matched Skills</p>
              <p className="mt-2 text-sm leading-6 text-emerald-900">
                {analysis.matchedSkills.join(", ") || "None detected"}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
              <p className="text-sm font-semibold text-amber-800">Missing Skills</p>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                {analysis.missingSkills.join(", ") || "None detected"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">
                  Improved Summary
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full px-3 text-slate-500 hover:bg-violet-50 hover:text-violet-700"
                  onClick={() => copyText(improvedSummaryText, "summary")}
                  disabled={!improvedSummaryText}
                >
                  <Copy className="mr-1.5 size-3.5" />
                  {copiedKey === "summary" ? "Copied" : "Copy"}
                </Button>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {improvedSummaryText || "No improved summary returned."}
              </p>
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
                  onClick={() => copyList(analysis.suggestions, "suggestions-all")}
                  disabled={analysis.suggestions.length === 0}
                >
                  <Copy className="mr-1.5 size-3.5" />
                  {copiedKey === "suggestions-all" ? "Copied" : "Copy all"}
                </Button>
              </div>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                {analysis.suggestions.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2">
                    <span className="mt-2 size-1.5 rounded-full bg-violet-500" />
                    <span className="flex-1">{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 shrink-0 rounded-full text-slate-400 hover:bg-violet-50 hover:text-violet-700"
                      onClick={() => copyText(item, `suggestion-${index}`)}
                      aria-label={`Copy suggestion: ${item}`}
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
              {analysis.suggestions.length === 0 && (
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  No AI suggestions returned.
                </p>
              )}
            </div>
          </div>

          {analysis.bulletPoints.length > 0 && (
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">
                  Rewritten Bullet Points
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full px-3 text-slate-500 hover:bg-indigo-50 hover:text-indigo-700"
                  onClick={() => copyText(bulletPointsText, "bullet-points")}
                  disabled={!bulletPointsText}
                >
                  <Copy className="mr-1.5 size-3.5" />
                  {copiedKey === "bullet-points" ? "Copied" : "Copy"}
                </Button>
              </div>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                {analysis.bulletPoints.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-indigo-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <CardHeader className="flex-row items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-7 place-items-center rounded-full bg-violet-50 text-violet-600">
            <CircleGauge className="size-4" />
          </div>
          <CardTitle className="text-lg text-black font-semibold">Recent Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="grid size-28 place-items-center rounded-3xl bg-violet-50 text-violet-500 shadow-inner">
              <div className="relative">
                <FileText className="size-12" />
                <span className="absolute -right-2 -bottom-2 rounded-full bg-violet-600 p-2 text-white shadow-lg shadow-violet-500/25">
                  <CircleGauge className="size-4" />
                </span>
              </div>
            </div>
          </div>
          <h3 className="mt-6 text-xl font-semibold text-slate-900">
            No analysis yet
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Upload your resume and paste a job description to get started.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
