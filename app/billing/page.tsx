import Link from "next/link"
import { WalletCards } from "lucide-react"

import { AiStaticPage } from "@/components/ai/ai-static-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import prisma from "@/lib/prisma"
import { getOrCreateDbUser } from "@/lib/auth-user"
import { getAiDashboardData } from "../ai/lib/dashboard-data"

type PlanRow = {
  id: string
  name: string
  description: string | null
  weeklyLimit: number
  price: number | null
  isActive: boolean
}

function formatMoney(value: number | null) {
  if (value === null) return "Contact sales"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value / 100)
}

function formatDate(date: Date) {
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

export default async function BillingPage() {
  const [dashboard, dbUser] = await Promise.all([
    getAiDashboardData(),
    getOrCreateDbUser(),
  ])

  if (!dbUser) {
    return (
      <AiStaticPage
        navigation={dashboard.navigation}
        userName={dashboard.header.userName}
        subtitle="Sign in to manage billing and plan details."
        weeklyUsage={dashboard.header.weeklyUsage}
        icon={WalletCards}
        title="Billing"
        description="Your billing information will appear here once you're signed in."
      >
        <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
          Sign in to view plan options and billing-related account details.
        </div>
      </AiStaticPage>
    )
  }

  const [subscription, plans] = await Promise.all([
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
    prisma.plan.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        {
          weeklyLimit: "asc",
        },
        {
          price: "asc",
        },
      ],
    }),
  ])

  const activePlan = subscription?.plan
  const weeklyLimit = activePlan?.weeklyLimit ?? dashboard.header.weeklyUsage.limit
  const priceValue = activePlan?.price ?? null
  const nextRenewal = subscription?.endDate ?? null

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="Review your active plan, usage limit, and available subscription options."
      weeklyUsage={dashboard.header.weeklyUsage}
      icon={WalletCards}
      title="Billing"
      description="Plan details and pricing data pulled from the database."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryTile
          label="Active plan"
          value={activePlan?.name || "Free plan"}
          note={subscription ? "You have an active subscription" : "No active subscription"}
        />
        <SummaryTile
          label="Weekly limit"
          value={`${weeklyLimit}`}
          note="Maximum analyses each week"
        />
        <SummaryTile
          label="Price"
          value={formatMoney(priceValue)}
          note="Plan pricing"
        />
        <SummaryTile
          label="Renewal"
          value={nextRenewal ? formatDate(nextRenewal) : "Not scheduled"}
          note="Subscription end date"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <p className="text-lg font-semibold text-foreground">Available plans</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Active plan options currently stored in the database.
          </p>

          {plans.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-border/70 bg-card/50 p-5 text-sm text-muted-foreground">
              No active plans are configured yet.
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-card/40">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="px-4 py-3">Plan</TableHead>
                    <TableHead className="px-4 py-3">Weekly limit</TableHead>
                    <TableHead className="px-4 py-3">Price</TableHead>
                    <TableHead className="px-4 py-3 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan: PlanRow) => (
                    <TableRow key={plan.id}>
                      <TableCell className="px-4 py-4">
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">{plan.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {plan.description || "No description provided"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-4 text-muted-foreground">
                        {plan.weeklyLimit}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-muted-foreground">
                        {formatMoney(plan.price)}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-right">
                        <Badge
                          variant="outline"
                          className={
                            plan.name === activePlan?.name
                              ? "border-primary/20 bg-primary/10 text-primary"
                              : "border-border/70 bg-card/80"
                          }
                        >
                          {plan.name === activePlan?.name ? "Current" : "Available"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <p className="text-lg font-semibold text-foreground">Plan actions</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your billing flow from here when plan changes are enabled.
          </p>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
              <p className="text-sm font-medium text-foreground">Current usage</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {dashboard.header.weeklyUsage.used} of {weeklyLimit} scans used this week.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
              <p className="text-sm font-medium text-foreground">Support</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Need help with billing? Reach out from the home site or update this
                page with a support workflow later.
              </p>
            </div>
          </div>

          <Button asChild className="mt-4 w-full">
            <Link href="/settings">Go to settings</Link>
          </Button>
        </div>
      </div>
    </AiStaticPage>
  )
}
