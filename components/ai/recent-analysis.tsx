import { CircleGauge, FileText } from "lucide-react"

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
              <p className="mt-1 text-3xl font-semibold text-slate-900">
                {analysis.atsScore}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Match Percent</p>
              <p className="mt-1 text-3xl font-semibold text-slate-900">
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
              <p className="text-sm font-semibold text-slate-900">
                Improved Summary
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {analysis.improvedSummary}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                AI Suggestions
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                {analysis.suggestions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-violet-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {analysis.bulletPoints.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Rewritten Bullet Points
              </p>
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
