"use client"

import { useState } from "react"
import { CircleGauge, FileText } from "lucide-react"
import { Check, Copy, RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type RecentAnalysisProps = {
  analysis?: {
    analysisId: string
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
  onGenerateResume?: () => void
  isGenerating?: boolean
}


export function RecentAnalysis({ analysis, error, onGenerateResume, isGenerating }: RecentAnalysisProps) {
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
      <Card className="border-danger/20 bg-card/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between border-b border-danger/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-7 place-items-center rounded-full bg-danger/10 text-danger">
              <CircleGauge className="size-4" />
            </div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Recent Analysis
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-10 text-sm text-danger">
          {error}
        </CardContent>
      </Card>
    )
  }

  if (analysis) {
    const improvedSummaryText = analysis.improvedSummary?.trim() || ""
    const bulletPointsText = analysis.bulletPoints.join("\n")

    return (
      <Card className="border-border/80 bg-card/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary">
              <CircleGauge className="size-4" />
            </div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Recent Analysis
            </CardTitle>
            {onGenerateResume && (
              <Button
                onClick={onGenerateResume}
                disabled={isGenerating}
                className={
                  "ml-auto h-10 px-6 text-sm font-semibold shadow-lg transition-all duration-300 border-2 rounded-full flex items-center gap-2 " +
                  (isGenerating
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed border-gray-300"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-blue-500 shadow-blue-500/30 hover:shadow-xl transform hover:scale-105 active:scale-95")
                }
              >
                {isGenerating ? (
                  "Generating..."
                ) : (
                  <>
                    <RotateCw className="size-4" />
                    Generate Update Resume
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-secondary p-4">
              <p className="text-sm text-muted-foreground">ATS Score</p>
              <p className={`mt-1 text-3xl font-semibold ${analysis.matchPercent <= 40
                ? "text-danger"
                : analysis.matchPercent <= 70
                  ? "text-warning-foreground"
                  : "text-success"
                }`}>
                {analysis.atsScore}%
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Match Percent</p>
              <p className={`mt-1 text-3xl font-semibold ${analysis.matchPercent <= 40
                ? "text-danger"
                : analysis.matchPercent <= 70
                  ? "text-warning"
                  : "text-foreground"
                }`}>
                {analysis.matchPercent}%
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Matched Skills</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {analysis.matchedSkills.length}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-success/20 bg-success/10 p-4">
              <p className="text-sm font-semibold text-success">Matched Skills</p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {analysis.matchedSkills.join(", ") || "None detected"}
              </p>
            </div>
            <div className="rounded-2xl border border-warning/20 bg-warning/10 p-4">
              <p className="text-sm font-semibold text-warning">Missing Skills</p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {analysis.missingSkills.join(", ") || "None detected"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">
                  Improved Summary
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full px-3 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  onClick={() => copyText(improvedSummaryText, "summary")}
                  disabled={!improvedSummaryText}
                >
                  <Copy className="mr-1.5 size-3.5" />
                  {copiedKey === "summary" ? "Copied" : "Copy"}
                </Button>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {improvedSummaryText || "No improved summary returned."}
              </p>
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
                  onClick={() => copyList(analysis.suggestions, "suggestions-all")}
                  disabled={analysis.suggestions.length === 0}
                >
                  <Copy className="mr-1.5 size-3.5" />
                  {copiedKey === "suggestions-all" ? "Copied all" : "Copy all"}
                </Button>
              </div>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                {analysis.suggestions.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-2 rounded-xl border border-border bg-secondary/80 px-3 py-2">
                    <span className="mt-2 size-1.5 rounded-full bg-primary" />
                    <span className="flex-1">{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7 shrink-0 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-foreground"
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
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  No AI suggestions returned.
                </p>
              )}
            </div>
          </div>

          {analysis.bulletPoints.length > 0 && (
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">
                  Rewritten Bullet Points
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full px-3 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  onClick={() => copyText(bulletPointsText, "bullet-points")}
                  disabled={!bulletPointsText}
                >
                  <Copy className="mr-1.5 size-3.5" />
                  {copiedKey === "bullet-points" ? "Copied" : "Copy"}
                </Button>
              </div>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                {analysis.bulletPoints.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-primary" />
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
    <Card className="border-border/80 bg-card/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <CardHeader className="flex-row items-center justify-between border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary">
            <CircleGauge className="size-4" />
          </div>
          <CardTitle className="text-lg font-semibold text-foreground">Recent Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="grid size-28 place-items-center rounded-3xl bg-primary/10 text-primary shadow-inner">
              <div className="relative">
                <FileText className="size-12" />
                <span className="absolute -right-2 -bottom-2 rounded-full bg-primary p-2 text-primary-foreground shadow-lg shadow-primary/25">
                  <CircleGauge className="size-4" />
                </span>
              </div>
            </div>
          </div>
          <h3 className="mt-6 text-xl font-semibold text-foreground">
            No analysis yet
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Upload your resume and paste a job description to get started.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}