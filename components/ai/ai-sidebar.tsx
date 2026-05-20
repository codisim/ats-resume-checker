"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bot,
  CircleCheckBig,
  CircleGauge,
  FileText,
  LayoutDashboard,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import UserMenu from "@/components/shared/navbar/Usermenu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type SidebarItem = {
  label: string
  href: string
  active?: boolean
  iconKey: string
}

type AiSidebarProps = {
  navigation: SidebarItem[]
}

const sidebarIcons: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  analyses: CircleGauge,
  resumes: FileText,
  saved_jobs: ReceiptText,
  usage: CircleCheckBig,
  settings: ShieldCheck,
  billing: WalletCards,
}

export function AiSidebar({ navigation }: AiSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-slate-200 bg-white text-slate-900 shadow-sm lg:flex">
      <div className="flex h-full flex-col gap-6 px-5 py-6">
        <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-sm">
            <Bot className="size-6 text-white" />
          </div>
          <div>
            <p className="text-xl font-semibold leading-tight">Codisim</p>
            <p className="text-sm text-slate-500">ATS Checker</p>
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
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto space-y-6">
          <Card className="border-slate-200 bg-slate-50 text-slate-900 shadow-none">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-slate-900">
                <Sparkles className="size-5" />
                <span className="font-semibold">Upgrade to Pro</span>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Get unlimited scans, advanced insights & more.
              </p>
              <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>

          <UserMenu />
        </div>
      </div>
    </aside>
  )
}
