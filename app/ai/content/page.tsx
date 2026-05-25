import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { Sparkles } from "lucide-react"

import { AiHeader } from "@/components/ai/ai-header"
import { AiSidebar } from "@/components/ai/ai-sidebar"
import { ContentManager } from "@/components/content/content-manager"
import { getClerkUserEmail, isAdminEmail } from "@/lib/admin"
import { listContent, toContentSummary } from "@/lib/content.server"
import { adminNavigation } from "../lib/admin-navigation"

export default async function ContentPage() {
  const clerkUser = await currentUser()
  const currentEmail = getClerkUserEmail(clerkUser)

  if (!isAdminEmail(currentEmail)) {
    notFound()
  }

  const items = await listContent()
  const userName =
    clerkUser?.firstName || clerkUser?.fullName?.split(" ")[0] || "admin"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AiSidebar navigation={adminNavigation} historyAnalyses={[]} />

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
            userName={userName}
            subtitle="Create, update, and publish blog posts and case studies from a single editor."
            weeklyUsage={{ used: 0, limit: 1 }}
            icon={Sparkles}
          />

          <section className="mt-6">
            <ContentManager initialItems={items.map(toContentSummary)} />
          </section>
        </div>
      </main>
    </div>
  )
}
