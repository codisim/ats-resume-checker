import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Stat = {
  label: string
  value: string
  note: string
  icon: LucideIcon
  iconTone: string
}

type StatsGridProps = {
  stats: Stat[]
}

export function StatsGrid({ stats }: StatsGridProps) {
  if (stats.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 px-6 py-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
        <p className="text-sm font-medium text-slate-900">No stats yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Generate your first analysis to unlock your dashboard metrics.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
          >
            <CardContent className="flex items-start gap-4 p-5">
              <div
                className={cn(
                  "grid size-11 place-items-center rounded-2xl",
                  stat.iconTone
                )}
              >
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{stat.note}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
