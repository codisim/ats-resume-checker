import { CircleGauge } from "lucide-react"

import { AiStaticPage } from "@/components/ai/ai-static-page"
import { Badge } from "@/components/ui/badge"
import prisma from "@/lib/prisma"
import { getOrCreateDbUser, getWeekStart } from "@/lib/auth-user"
import { getAiDashboardData } from "../lib/dashboard-data"

function formatWeek(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date)
}

function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function SummaryTile({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{note}</p>
    </div>
  )
}

export default async function UsagePage() {
  const [dashboard, dbUser] = await Promise.all([
    getAiDashboardData(),
    getOrCreateDbUser(),
  ])

  if (!dbUser) {
    return (
      <AiStaticPage
        navigation={dashboard.navigation}
        userName={dashboard.header.userName}
        subtitle="Sign in to see your weekly usage history."
        weeklyUsage={dashboard.header.weeklyUsage}
        icon={CircleGauge}
        title="Usage"
        description="Your scan history will appear here once you're signed in."
      >
        <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
          Weekly usage tracking is available after you sign in and start running
          analyses.
        </div>
      </AiStaticPage>
    )
  }

  const currentWeekStart = getWeekStart()
  const [usageRecords, activeSubscription] = await Promise.all([
    prisma.usage.findMany({
      where: { userId: dbUser.id },
      orderBy: { weekStart: "desc" },
      take: 8,
    }),
    prisma.subscription.findFirst({
      where: {
        userId: dbUser.id,
        status: "ACTIVE",
      },
      include: {
        plan: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ])

  const weeklyLimit = activeSubscription?.plan.weeklyLimit ?? dashboard.header.weeklyUsage.limit
  const currentUsage = usageRecords.find(
    (record) => record.weekStart.getTime() === currentWeekStart.getTime()
  )
  const currentCount = currentUsage?.count ?? dashboard.header.weeklyUsage.used
  const remaining = Math.max(weeklyLimit - currentCount, 0)
  const maxCount = Math.max(
    weeklyLimit,
    ...usageRecords.map((record) => record.count),
    currentCount
  )
  const progressValue =
    weeklyLimit > 0 ? Math.min(100, Math.round((currentCount / weeklyLimit) * 100)) : 0

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="See how much of your weekly scan allowance you've used and what's left."
      weeklyUsage={{ used: currentCount, limit: weeklyLimit }}
      icon={CircleGauge}
      title="Usage"
      description="Live usage data, weekly limits, and recent scan activity."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryTile
          label="This week"
          value={`${currentCount}`}
          note="Analyses used so far"
        />
        <SummaryTile
          label="Remaining"
          value={`${remaining}`}
          note="Scans left before the limit"
        />
        <SummaryTile
          label="Weekly limit"
          value={`${weeklyLimit}`}
          note={activeSubscription?.plan.name || "Default plan"}
        />
        <SummaryTile
          label="Tracked weeks"
          value={`${usageRecords.length}`}
          note="Usage records loaded from the database"
        />
      </div>

      <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">Weekly progress</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Current week started on {formatLongDate(currentWeekStart)}.
            </p>
          </div>
          <Badge variant="outline" className="border-border/70 bg-card/80">
            {progressValue}% used
          </Badge>
        </div>
        <div className="mt-4">
          <div className="h-3 rounded-full bg-muted">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-primary to-primary/70"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-foreground">Recent weeks</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Weekly usage records sorted from newest to oldest.
            </p>
          </div>
        </div>

        {usageRecords.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border/70 bg-card/50 p-5 text-sm text-muted-foreground">
            No usage records yet. Run your first analysis to start tracking usage.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {usageRecords.map((record) => {
              const percentage =
                maxCount > 0 ? Math.max((record.count / maxCount) * 100, 8) : 8
              const isCurrentWeek = record.weekStart.getTime() === currentWeekStart.getTime()

              return (
                <div
                  key={record.id}
                  className="rounded-2xl border border-border/70 bg-card/60 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {formatWeek(record.weekStart)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatLongDate(record.weekStart)}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={isCurrentWeek ? "border-primary/20 bg-primary/10 text-primary" : "border-border/70 bg-card/80"}
                    >
                      {record.count} scans
                    </Badge>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/70"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AiStaticPage>
  )
}
