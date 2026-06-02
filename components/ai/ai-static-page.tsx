"use client"

import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import { AiHeader } from "@/components/ai/ai-header"
import { AiSidebar } from "@/components/ai/ai-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardNavigationItem } from "@/app/ai/lib/dashboard-data"

type AiStaticPageProps = {
  navigation: DashboardNavigationItem[]
  userName: string
  subtitle: string
  weeklyUsage: {
    used: number
    limit: number
  }
  icon: LucideIcon
  title: string
  description: string
  children?: ReactNode
}

export function AiStaticPage({
  navigation,
  userName,
  subtitle,
  weeklyUsage,
  icon,
  title,
  description,
  children,
}: AiStaticPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AiSidebar navigation={navigation} />

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
            subtitle={subtitle}
            weeklyUsage={weeklyUsage}
            icon={icon}
          />

          <section className="mt-6">
            <Card className="overflow-hidden border-border/70 bg-card/70 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <CardHeader className="border-b border-border/70 bg-card/40 pb-4">
                <CardTitle className="text-xl text-foreground">{title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-5 sm:p-6">
                {children}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
