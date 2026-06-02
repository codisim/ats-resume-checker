import { CircleGauge } from "lucide-react"

import { AiStaticPage } from "@/components/ai/ai-static-page"
import { getAiDashboardData } from "../lib/dashboard-data"

export default async function UsagePage() {
  const dashboard = await getAiDashboardData()

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="See how many analyses you have used this week and what remains."
      weeklyUsage={dashboard.header.weeklyUsage}
      icon={CircleGauge}
      title="Usage"
      description="Your weekly scan usage and account limits live here."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <p className="text-sm font-medium text-muted-foreground">Used this week</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {dashboard.header.weeklyUsage.used}
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <p className="text-sm font-medium text-muted-foreground">Weekly limit</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {dashboard.header.weeklyUsage.limit}
          </p>
        </div>
      </div>
    </AiStaticPage>
  )
}
