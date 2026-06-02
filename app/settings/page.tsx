import { Settings } from "lucide-react"

import { AiStaticPage } from "@/components/ai/ai-static-page"
import { getAiDashboardData } from "../ai/lib/dashboard-data"

export default async function SettingsPage() {
  const dashboard = await getAiDashboardData()

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="Update your profile, preferences, and account behavior."
      weeklyUsage={dashboard.header.weeklyUsage}
      icon={Settings}
      title="Settings"
      description="Adjust your account and application preferences."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <p className="text-sm font-medium text-foreground">Profile</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Review account details, name, and avatar.
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <p className="text-sm font-medium text-foreground">Preferences</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Control your UI theme and dashboard behavior.
          </p>
        </div>
      </div>
    </AiStaticPage>
  )
}
