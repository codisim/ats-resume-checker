import {
  Bell,
  CircleCheckBig,
  CircleGauge,
  FileText,
  LayoutDashboard,
  ReceiptText,
  ShieldCheck,
  WalletCards,
} from "lucide-react"

import { AiHeader } from "@/components/ai/ai-header"
import { AiSidebar } from "@/components/ai/ai-sidebar"
import { AnalysisHistoryPanel } from "@/components/ai/analysis-history-panel"
import { getAiAnalysisHistoryData } from "../lib/dashboard-data"

const navigationIcons = {
  dashboard: LayoutDashboard,
  analyses: CircleGauge,
  resumes: FileText,
  saved_jobs: ReceiptText,
  usage: CircleCheckBig,
  settings: ShieldCheck,
  billing: WalletCards,
}

export default async function AnalysesPage() {
  const dashboard = await getAiAnalysisHistoryData()

  const navigation = dashboard.navigation.map((item) => ({
    ...item,
    icon: navigationIcons[item.iconKey as keyof typeof navigationIcons],
  }))

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

          <section className="mt-6">
            <AnalysisHistoryPanel analyses={dashboard.analyses} />
          </section>
        </div>
      </main>
    </div>
  )
}
