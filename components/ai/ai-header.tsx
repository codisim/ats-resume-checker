import type { LucideIcon } from "lucide-react"
import { Bell, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type AiHeaderProps = {
  userName: string
  subtitle: string
  weeklyUsage: {
    used: number
    limit: number
  }
  icon?: LucideIcon
}

export function AiHeader({
  userName,
  subtitle,
  weeklyUsage,
  icon: Icon = Sparkles,
}: AiHeaderProps) {
  const usagePercent = Math.min(
    100,
    Math.round((weeklyUsage.used / weeklyUsage.limit) * 100)
  )

  return (
    <header className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Welcome back, {userName} 👋
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">{subtitle}</p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center xl:w-auto xl:justify-end">
        <Card className="w-full border-slate-200/80 bg-white/90 shadow-sm sm:w-[235px]">
          <CardContent className="space-y-2.5 p-">
            <div className="flex items-start justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 font-medium text-slate-600">
                <Icon className="size-4 shrink-0 text-violet-600" />
                <span>Weekly Usage</span>
              </div>
              <span className="text-right text-slate-400">
                {weeklyUsage.used} / {weeklyUsage.limit} scans used
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          size="icon"
          className="size-10 shrink-0 rounded-xl border-slate-200 bg-white/90 shadow-sm"
        >
          <Bell className="size-4" />
        </Button>

        <Button className="h-11 w-full rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 text-white shadow-lg shadow-violet-500/20 hover:from-violet-400 hover:to-indigo-500 sm:w-auto">
          <span className="flex items-center gap-2">
            <span className="text-base">👑</span>
            Upgrade to Pro
          </span>
        </Button>
      </div>
    </header>
  )
}
