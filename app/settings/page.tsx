import Image from "next/image"
import Link from "next/link"
import { Settings } from "lucide-react"
import { currentUser } from "@clerk/nextjs/server"

import { AiStaticPage } from "@/components/ai/ai-static-page"
import ThemeSwitcher from "@/components/shared/navbar/ThemeSwitcher"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { getClerkUserEmail } from "@/lib/admin"
import { getOrCreateDbUser } from "@/lib/auth-user"
import { getAiDashboardData } from "../ai/lib/dashboard-data"

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function AccountTile({
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
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{note}</p>
    </div>
  )
}

export default async function SettingsPage() {
  const [dashboard, clerkUser, dbUser] = await Promise.all([
    getAiDashboardData(),
    currentUser(),
    getOrCreateDbUser(),
  ])

  if (!clerkUser || !dbUser) {
    return (
      <AiStaticPage
        navigation={dashboard.navigation}
        userName={dashboard.header.userName}
        subtitle="Sign in to access your account settings."
        weeklyUsage={dashboard.header.weeklyUsage}
        icon={Settings}
        title="Settings"
        description="Your profile preferences and account details will appear here."
      >
        <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
          Sign in to manage your profile, theme, and account information.
        </div>
      </AiStaticPage>
    )
  }

  const [subscription, linkedUser] = await Promise.all([
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
    prisma.user.findUnique({
      where: {
        id: dbUser.id,
      },
      select: {
        country: true,
        createdAt: true,
        role: true,
      },
    }),
  ])

  const fullName =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() ||
    clerkUser.fullName ||
    "User"
  const email = getClerkUserEmail(clerkUser) || dbUser.email
  const initials =
    fullName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="Manage your profile, theme, and plan settings from one place."
      weeklyUsage={dashboard.header.weeklyUsage}
      icon={Settings}
      title="Settings"
      description="Real account data pulled from Clerk and the database."
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <AccountTile
          label="Name"
          value={fullName}
          note="Shown across your account"
        />
        <AccountTile label="Email" value={email} note="Used for sign-in" />
        <AccountTile
          label="Role"
          value={linkedUser?.role || "USER"}
          note="Controls access to admin screens"
        />
        <AccountTile
          label="Country"
          value={linkedUser?.country || "Not set"}
          note={linkedUser?.createdAt ? `Joined ${formatDate(linkedUser.createdAt)}` : "Account created"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-primary/10 text-lg font-semibold text-primary">
                {clerkUser.imageUrl ? (
                  <Image
                    src={clerkUser.imageUrl}
                    alt={fullName}
                    width={64}
                    height={64}
                    className="size-16 rounded-2xl object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{fullName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{email}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-border/70 bg-card/80">
                    {linkedUser?.role || "USER"}
                  </Badge>
                  <Badge variant="outline" className="border-border/70 bg-card/80">
                    {subscription?.plan.name || "Free plan"}
                  </Badge>
                </div>
              </div>
            </div>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/ai">Back to dashboard</Link>
            </Button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
              <p className="text-sm font-medium text-foreground">Theme</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Toggle between light and dark appearance.
              </p>
              <div className="mt-4">
                <ThemeSwitcher />
              </div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
              <p className="text-sm font-medium text-foreground">Admin access</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {linkedUser?.role === "ADMIN"
                  ? "You can access the admin dashboard and content manager."
                  : "Standard user access is active for this account."}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
          <p className="text-lg font-semibold text-foreground">Plan details</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Current subscription and usage limit pulled from the database.
          </p>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
              <p className="text-sm font-medium text-foreground">Plan</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {subscription?.plan.name || "Free plan"}
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
              <p className="text-sm font-medium text-foreground">Weekly limit</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {subscription?.plan.weeklyLimit || dashboard.header.weeklyUsage.limit} scans
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
              <p className="text-sm font-medium text-foreground">Status</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {subscription ? "Active" : "No active subscription"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AiStaticPage>
  )
}
