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
    <Card className="border-border/80 bg-card/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <CardHeader className="flex-row items-center justify-between border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary">
            <ChevronRight className="size-4 rotate-90" />
          </div>
          <CardTitle className="text-lg font-semibold text-foreground">Previous Analyses</CardTitle>
        </div>
        <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary">
          View All
        </button>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {analyses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/70 px-4 py-8 text-center">
            <p className="text-sm font-medium text-foreground">
              No analyses yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload your first resume and analyze it to see history here.
            </p>
          </div>
        ) : (
          analyses.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <PercentRing value={item.score} className={item.ring} />
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.date} • {item.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  item.tone === "good" && "bg-success/10 text-success border-success/20",
                  item.tone === "average" && "bg-warning/15 text-warning-foreground border-warning/20",
                  item.tone === "low" && "bg-danger/10 text-danger border-danger/20"
                )}
              >
                {item.label}
              </Badge>
              <ChevronRight className="size-5 text-muted-foreground" />
            </div>
          </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
