import { WalletCards } from "lucide-react"

import { AiStaticPage } from "@/components/ai/ai-static-page"
import { getAiDashboardData } from "../ai/lib/dashboard-data"

export default async function BillingPage() {
  const dashboard = await getAiDashboardData()

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="Review your current plan, invoices, and payment options."
      weeklyUsage={dashboard.header.weeklyUsage}
      icon={WalletCards}
      title="Billing"
      description="Manage plan and payment details from one place."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <p className="text-sm font-medium text-foreground">Current plan</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Starter plan with weekly scan limits.
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <p className="text-sm font-medium text-foreground">Payment method</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add or update your card details when you are ready.
          </p>
        </div>
      </div>
    </AiStaticPage>
  )
}
