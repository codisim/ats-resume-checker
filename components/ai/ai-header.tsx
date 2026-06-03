import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Bell, Home, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ThemeSwitcher from "@/components/shared/navbar/ThemeSwitcher"

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
    <header className="sticky top-0 z-30 mb-6 rounded-3xl border border-border/70 bg-card/85 px-4 py-4 shadow-sm backdrop-blur-xl sm:px-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Welcome back, {userName} 👋
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(235px,1fr)_auto_auto_auto] sm:items-center xl:min-w-[640px] xl:justify-end">
          <Card className="w-full border-border/80 bg-card/90 shadow-sm">
            <CardContent className="space-y-2.5 px-6">
              <div className="flex items-start justify-between gap-3 text-sm">
                <div className="flex items-center gap-2 font-medium text-foreground/80">
                  <Icon className="size-4 shrink-0 text-foreground" />
                  <span>Weekly Usage</span>
                </div>
                <span className="text-right text-muted-foreground">
                  {weeklyUsage.used} / {weeklyUsage.limit} scans used
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-primary to-primary/70"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* <Button
            asChild
            variant="outline"
            className="h-11 rounded-xl border-border bg-card/90 px-4 shadow-sm"
          >
            <Link href="/">
              <Home className="size-4" />
              <span>Go to Home</span>
            </Link>
          </Button> */}

          <Button
            variant="outline"
            size="icon"
            className="size-10 shrink-0 rounded-xl border-border bg-card/90 shadow-sm"
          >
            <Bell className="size-4" />
          </Button>

          <ThemeSwitcher />
          {/* <UserMenu /> */}

          <Button className="h-11 cursor-pointer w-full rounded-xl bg-primary px-4 text-primary-foreground shadow-sm hover:brightness-95">
            <span className="flex items-center gap-2">
              <span className="text-base">👑</span>
              Upgrade to Pro
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}
