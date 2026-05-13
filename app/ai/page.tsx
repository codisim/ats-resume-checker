import {
  Bell,
  Bot,
  CircleCheckBig,
  CircleGauge,
  FileText,
  LayoutDashboard,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react"

import { AiHeader } from "@/components/ai/ai-header"
import { AiSidebar } from "@/components/ai/ai-sidebar"
import { AnalysisComposer } from "@/components/ai/analysis-composer"
import { PreviousAnalyses } from "@/components/ai/previous-analyses"
import { RecentAnalysis } from "@/components/ai/recent-analysis"
import { StatsGrid } from "@/components/ai/stats-grid"
import {
  type DashboardAnalysis,
  getAiDashboardData,
} from "./lib/dashboard-data"

const navigationIcons = {
  dashboard: LayoutDashboard,
  analyses: CircleGauge,
  resumes: FileText,
  saved_jobs: ReceiptText,
  usage: CircleCheckBig,
  settings: ShieldCheck,
  billing: WalletCards,
}

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
      good: "border-emerald-500 text-emerald-600",
      average: "border-amber-500 text-amber-600",
      low: "border-rose-500 text-rose-600",
    }[item.ring],
  }))
}

export default async function Page() {
  const dashboard = await getAiDashboardData()

  const navigation = dashboard.navigation.map((item) => ({
    ...item,
    icon: navigationIcons[item.iconKey as keyof typeof navigationIcons],
  }))

  const stats = dashboard.stats.map((item) => ({
    ...item,
    icon: statIcons[item.iconKey as keyof typeof statIcons],
  }))

  const analyses = withAnalysisPresentation(dashboard.previousAnalyses)

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8f9ff_0%,#f3f5fb_100%)] text-slate-900">
      <AiSidebar navigation={navigation} />

      <main className="relative lg:pl-72">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.08),transparent_35%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%)]" />

        <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
          <AiHeader
            userName={dashboard.header.userName}
            subtitle={dashboard.header.subtitle}
            weeklyUsage={dashboard.header.weeklyUsage}
            icon={Bell}
          />

          <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <AnalysisComposer />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[0.98fr_1.02fr]">
            <RecentAnalysis />
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
