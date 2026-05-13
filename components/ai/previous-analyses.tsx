import { ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Analysis = {
  score: number
  title: string
  date: string
  time: string
  label: string
  tone: "good" | "average" | "low"
  ring: string
}

type PreviousAnalysesProps = {
  analyses: Analysis[]
}

function PercentRing({ value, className }: { value: number; className: string }) {
  return (
    <div className={cn("grid size-12 place-items-center rounded-full border-4 text-xs font-semibold", className)}>
      {value}%
    </div>
  )
}

export function PreviousAnalyses({ analyses }: PreviousAnalysesProps) {
  return (
    <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <CardHeader className="flex-row items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-7 place-items-center rounded-full bg-violet-50 text-violet-600">
            <ChevronRight className="size-4 rotate-90" />
          </div>
          <CardTitle className="text-lg text-black font-semibold">Previous Analyses</CardTitle>
        </div>
        <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
          View All
        </button>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {analyses.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <PercentRing value={item.score} className={item.ring} />
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {item.date} • {item.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  item.tone === "good" && "bg-emerald-50 text-emerald-700 border-emerald-100",
                  item.tone === "average" && "bg-amber-50 text-amber-700 border-amber-100",
                  item.tone === "low" && "bg-rose-50 text-rose-700 border-rose-100"
                )}
              >
                {item.label}
              </Badge>
              <ChevronRight className="size-5 text-slate-400" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
