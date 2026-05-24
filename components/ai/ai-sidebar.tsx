"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { MouseEvent } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Bot,
  CircleCheckBig,
  CircleGauge,
  FileText,
  LayoutDashboard,
  ReceiptText,
  Newspaper,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react"

import { AnalysisHistoryPanel } from "@/components/ai/analysis-history-panel"
import type { AnalysisHistoryItem } from "@/components/ai/analysis-history-panel"
import UserMenu from "@/components/shared/navbar/Usermenu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type SidebarItem = {
  label: string
  href: string
  active?: boolean
  iconKey: string
}

type AiSidebarProps = {
  navigation: SidebarItem[]
  historyAnalyses?: AnalysisHistoryItem[]
}

const sidebarIcons: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  analyses: CircleGauge,
  resumes: FileText,
  saved_jobs: ReceiptText,
  usage: CircleCheckBig,
  settings: ShieldCheck,
  billing: WalletCards,
  content: Newspaper,
}

export function AiSidebar({
  navigation,
  historyAnalyses = [],
}: AiSidebarProps) {
  const pathname = usePathname()
  const [historyOpen, setHistoryOpen] = useState(false)

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: SidebarItem
  ) => {
    if (item.href === "/ai/analyses") {
      event.preventDefault()
      setHistoryOpen(true)
    }
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-border bg-card text-foreground shadow-sm lg:flex">
        <div className="flex h-full flex-col gap-6 px-5 py-6">
          <div className="flex items-center gap-4 rounded-3xl border border-border bg-secondary px-4 py-4">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary shadow-sm">
              <Bot className="size-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold leading-tight">Codisim</p>
              <p className="text-sm text-muted-foreground">ATS Checker</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = sidebarIcons[item.iconKey] ?? LayoutDashboard
              const isActive =
                item.href !== "#" &&
                (pathname === item.href || pathname.startsWith(`${item.href}/`))
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavigationClick(event, item)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto space-y-6">
            <Card className="border-border bg-secondary text-foreground shadow-none">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-2 text-foreground">
                  <Sparkles className="size-5" />
                  <span className="font-semibold">Upgrade to Pro</span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  Get unlimited scans, advanced insights & more.
                </p>
                <Button className="w-full cursor-pointer bg-primary text-primary-foreground hover:brightness-95">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>

            <UserMenu />
          </div>
        </div>
      </aside>

      <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-5xl">
          <SheetHeader className="px-0 pt-4">
            <SheetTitle className="text-2xl font-semibold text-foreground">
              Analysis History
            </SheetTitle>
            <p className="text-sm text-muted-foreground">
              Browse every saved resume analysis, then open one for full details.
            </p>
          </SheetHeader>

          <div className="mt-6 pb-8">
            <AnalysisHistoryPanel analyses={historyAnalyses} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
