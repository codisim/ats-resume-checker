import { Bell } from "lucide-react"

import { AiHeader } from "@/components/ai/ai-header"
import { AiSidebar } from "@/components/ai/ai-sidebar"
import { AnalysisHistoryPanel } from "@/components/ai/analysis-history-panel"
import { getAiAnalysisHistoryData } from "../lib/dashboard-data"

export default async function AnalysesPage() {
  const dashboard = await getAiAnalysisHistoryData()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AiSidebar navigation={dashboard.navigation} />

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

          <section className="mt-6">
            <AnalysisHistoryPanel analyses={dashboard.analyses} />
          </section>
        </div>
      </main>
    </div>
  )
}
