import {
  Bell,
  Bot,
  CircleGauge,
  FileText,
  Sparkles,
} from "lucide-react"
import { currentUser } from "@clerk/nextjs/server"

import { AdminDashboard } from "@/components/ai/admin-dashboard"
import { AiHeader } from "@/components/ai/ai-header"
import { AiSidebar } from "@/components/ai/ai-sidebar"
import { AnalysisComposer } from "@/components/ai/analysis-composer"
import { PreviousAnalyses } from "@/components/ai/previous-analyses"
import { StatsGrid } from "@/components/ai/stats-grid"
import { ContentManager } from "@/components/content/content-manager"
import { ADMIN_EMAIL, getClerkUserEmail } from "@/lib/admin"
import { listContent, toContentSummary } from "@/lib/content.server"
import { getAdminDashboardData } from "./lib/admin-dashboard-data"
import { adminNavigation } from "./lib/admin-navigation"
import {
  type DashboardAnalysis,
  getAiDashboardData,
} from "./lib/dashboard-data"

const statIcons = {
  analyses: Bot,
  average: CircleGauge,
  resumes: FileText,
  weekly: Sparkles,
}

function withAnalysisPresentation(items: DashboardAnalysis[]) {
  return items.map((item) => ({
    ...item,
    ring: {
      good: "border-success text-success",
      average: "border-warning text-warning-foreground",
      low: "border-danger text-danger",
    }[item.ring],
  }))
}

export default async function Page() {
  const clerkUser = await currentUser()
  const currentEmail = getClerkUserEmail(clerkUser)

  if (currentEmail === ADMIN_EMAIL) {
    const [adminDashboard, contentItems] = await Promise.all([
      getAdminDashboardData(),
      listContent(),
    ])

    return (
      <div className="min-h-screen bg-background text-foreground">
        <AiSidebar
          navigation={adminNavigation}
          historyAnalyses={[]}
        />

        <main className="relative lg:pl-72">
          <div
            className="absolute inset-x-0 top-0 -z-10 h-72"
            style={{
              background:
                "radial-gradient(circle_at_top_left,color-mix(in oklab, var(--primary) 18%, transparent),transparent 35%),radial-gradient(circle_at_top_right,color-mix(in oklab, var(--warning) 18%, transparent),transparent 28%)",
            }}
          />

          <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
            <AdminDashboard data={adminDashboard} />

            <section className="mt-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Content management
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Create, update, and publish blog posts and case studies
                    without leaving the admin dashboard.
                  </p>
                </div>
              </div>

              <ContentManager
                initialItems={contentItems.map(toContentSummary)}
              />
            </section>
          </div>
        </main>
      </div>
    )
  }

  const dashboard = await getAiDashboardData()

  const stats = dashboard.stats.map((item) => ({
    ...item,
    icon: statIcons[item.iconKey as keyof typeof statIcons],
  }))

  const analyses = withAnalysisPresentation(dashboard.previousAnalyses)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AiSidebar
        navigation={dashboard.navigation}
        historyAnalyses={dashboard.historyAnalyses}
      />

      <main className="relative lg:pl-72">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-72"
          style={{
            background:
              "radial-gradient(circle_at_top_left,color-mix(in oklab, var(--primary) 18%, transparent),transparent 35%),radial-gradient(circle_at_top_right,color-mix(in oklab, var(--warning) 18%, transparent),transparent 28%)",
          }}
        />

        <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
          <AiHeader
            userName={dashboard.header.userName}
            subtitle={dashboard.header.subtitle}
            weeklyUsage={dashboard.header.weeklyUsage}
            icon={Bell}
          />

          <AnalysisComposer />

          <section className="mt-6">
            <PreviousAnalyses analyses={analyses} />
          </section>

          <section className="mt-6">
            <StatsGrid stats={stats} />
          </section>
        </div>
      </main>
    </div>
  )
}
