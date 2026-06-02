import { ReceiptText } from "lucide-react"

import { AiStaticPage } from "@/components/ai/ai-static-page"
import { getAiDashboardData } from "../lib/dashboard-data"

export default async function SavedJobsPage() {
  const dashboard = await getAiDashboardData()

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="Track jobs you want to revisit and compare them against your resumes."
      weeklyUsage={dashboard.header.weeklyUsage}
      icon={ReceiptText}
      title="Saved Jobs"
      description="Keep your saved job posts in one place for faster analysis later."
    >
      <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-5 text-sm text-muted-foreground">
        Saved job listings can appear here once you connect them to the workflow.
        The menu now points to a real page.
      </div>
    </AiStaticPage>
  )
}
