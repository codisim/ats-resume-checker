import type { ReactNode } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Bell,
  Bot,
  ChevronRight,
  CircleCheckBig,
  CircleGauge,
  FileText,
  LayoutDashboard,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Upload,
  WalletCards,
} from "lucide-react"

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "My Analyses", icon: CircleGauge },
  { label: "Resumes", icon: FileText },
  { label: "Saved Jobs", icon: ReceiptText },
  { label: "Usage", icon: CircleCheckBig },
  { label: "Settings", icon: ShieldCheck },
  { label: "Billing", icon: WalletCards },
]

const previousAnalyses = [
  {
    score: 82,
    title: "Frontend Developer",
    date: "May 20, 2024",
    time: "10:30 AM",
    label: "Good Match",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    ring: "border-emerald-500 text-emerald-600",
  },
  {
    score: 74,
    title: "React Developer",
    date: "May 18, 2024",
    time: "04:15 PM",
    label: "Average Match",
    tone: "bg-amber-50 text-amber-700 border-amber-100",
    ring: "border-amber-500 text-amber-600",
  },
  {
    score: 61,
    title: "Full Stack Engineer",
    date: "May 15, 2024",
    time: "09:20 AM",
    label: "Needs Improvement",
    tone: "bg-rose-50 text-rose-700 border-rose-100",
    ring: "border-rose-500 text-rose-600",
  },
]

const stats = [
  {
    label: "Total Analyses",
    value: "3",
    note: "All time",
    icon: Bot,
    iconTone: "bg-violet-100 text-violet-600",
  },
  {
    label: "Average ATS Score",
    value: "72%",
    note: "Across all analyses",
    icon: CircleGauge,
    iconTone: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Resumes Uploaded",
    value: "1",
    note: "Manage your resumes",
    icon: FileText,
    iconTone: "bg-blue-100 text-blue-600",
  },
  {
    label: "Weekly Usage",
    value: "3 / 10",
    note: "Scans used this week",
    icon: Sparkles,
    iconTone: "bg-amber-100 text-amber-600",
  },
]

function PercentRing({ value, className }: { value: number; className: string }) {
  return (
    <div
      className={cn(
        "grid size-12 place-items-center rounded-full border-4 text-xs font-semibold",
        className
      )}
    >
      {value}%
    </div>
  )
}

function SectionShell({
  title,
  badge,
  action,
  children,
}: {
  title: string
  badge?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-violet-600 text-sm font-semibold text-white">
            {badge}
          </span>
          <div>
            <CardTitle className="text-base font-semibold text-slate-900">
              {title}
            </CardTitle>
          </div>
        </div>
        {action}
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8f9ff_0%,#f3f5fb_100%)] text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col bg-[#0b1220] text-slate-100 shadow-[20px_0_60px_rgba(15,23,42,0.18)] lg:flex">
        <div className="flex h-full flex-col gap-6 px-5 py-6">
          <div className="flex items-center gap-4 rounded-3xl bg-white/5 px-4 py-4 ring-1 ring-white/10">
            <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
              <Bot className="size-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-semibold leading-tight">Codisim</p>
              <p className="text-sm text-slate-300">ATS Checker</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href="#"
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                    item.active
                      ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </a>
              )
            })}
          </nav>

          <div className="mt-auto space-y-6">
            <Card className="border-white/10 bg-white/5 text-white shadow-none">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <Sparkles className="size-5" />
                  <span className="font-semibold">Upgrade to Pro</span>
                </div>
                <p className="text-sm leading-6 text-slate-300">
                  Get unlimited scans, advanced insights & more.
                </p>
                <Button className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:from-violet-400 hover:to-indigo-500">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
              <div className="flex items-center gap-3">
                <Avatar className="size-11 border border-white/10">
                  <AvatarImage src="/avatars/shadcn.jpg" alt="Waliullah" />
                  <AvatarFallback>W</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Waliullah</p>
                  <p className="text-xs text-slate-400">waliullah@gmail.com</p>
                </div>
              </div>
              <ChevronRight className="size-4 text-slate-400" />
            </div>
          </div>
        </div>
      </aside>

      <main className="relative lg:pl-72">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.08),transparent_35%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%)]" />

        <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Welcome back, Waliullah 👋
              </h1>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Analyze your resume and beat the ATS system.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 xl:justify-end">
              <Card className="w-full border-slate-200/80 bg-white/90 shadow-sm sm:w-[235px]">
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">
                      Weekly Usage
                    </span>
                    <span className="text-slate-400">3 / 10 scans used</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200">
                    <div className="h-1.5 w-[30%] rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-xl border-slate-200 bg-white/90 shadow-sm"
              >
                <Bell className="size-4" />
              </Button>

              <Button className="h-11 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 text-white shadow-lg shadow-violet-500/20 hover:from-violet-400 hover:to-indigo-500">
                <span className="flex items-center gap-2">
                  <span className="text-base">👑</span>
                  Upgrade to Pro
                </span>
              </Button>
            </div>
          </header>

          <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <SectionShell
              badge="1"
              title="Upload Your Resume"
              action={<span className="text-sm text-slate-400">PDF / DOCX</span>}
            >
              <div className="grid gap-4">
                <div className="rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/40 px-5 py-8">
                  <div className="mx-auto flex max-w-md flex-col items-center text-center">
                    <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25">
                      <Upload className="size-8" />
                    </div>
                    <p className="mt-5 text-lg font-semibold text-slate-900">
                      Drag & drop your resume here
                    </p>
                    <p className="mt-1 text-sm text-slate-500">or</p>
                    <Button className="mt-4 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 text-white hover:from-violet-400 hover:to-indigo-500">
                      Choose File
                    </Button>
                    <p className="mt-4 text-sm text-slate-500">
                      Supports: PDF, DOCX (Max 10MB)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-red-50 text-red-500">
                      <FileText className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        Waliullah_Resume.pdf
                      </p>
                      <p className="text-sm text-slate-500">245 KB</p>
                    </div>
                  </div>
                  <CircleCheckBig className="size-5 text-emerald-500" />
                </div>
              </div>
            </SectionShell>

            <SectionShell
              badge="2"
              title="Paste Job Description"
              action={<span className="text-sm text-slate-400">0 / 5000</span>}
            >
              <div className="flex h-full flex-col">
                <textarea
                  className="min-h-[300px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                  defaultValue=""
                  placeholder="Paste the job description here..."
                />
                <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-500">
                  <p>Tip: Paste the full job description to get better accuracy.</p>
                  <span>0 / 5000</span>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button className="h-11 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 text-white shadow-lg shadow-violet-500/20 hover:from-violet-400 hover:to-indigo-500">
                    <span className="flex items-center gap-2">
                      <Sparkles className="size-4" />
                      Analyze My Resume
                    </span>
                  </Button>
                </div>
              </div>
            </SectionShell>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[0.98fr_1.02fr]">
            <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <CardHeader className="flex-row items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-7 place-items-center rounded-full bg-violet-50 text-violet-600">
                    <CircleGauge className="size-4" />
                  </div>
                  <CardTitle className="text-base">Recent Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-12">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="grid size-28 place-items-center rounded-3xl bg-violet-50 text-violet-500 shadow-inner">
                      <div className="relative">
                        <FileText className="size-12" />
                        <span className="absolute -right-2 -bottom-2 rounded-full bg-violet-600 p-2 text-white shadow-lg shadow-violet-500/25">
                          <CircleGauge className="size-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    No analysis yet
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Upload your resume and paste a job description to get
                    started.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <CardHeader className="flex-row items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-7 place-items-center rounded-full bg-violet-50 text-violet-600">
                    <CircleGauge className="size-4" />
                  </div>
                  <CardTitle className="text-base">Previous Analyses</CardTitle>
                </div>
                <Button variant="outline" className="rounded-xl">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {previousAnalyses.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <PercentRing value={item.score} className={item.ring} />
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.date} • {item.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium",
                          item.tone
                        )}
                      >
                        {item.label}
                      </Badge>
                      <ChevronRight className="size-5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card
                  key={stat.label}
                  className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
                >
                  <CardContent className="flex items-start gap-4 p-5">
                    <div
                      className={cn(
                        "grid size-11 place-items-center rounded-2xl",
                        stat.iconTone
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">{stat.note}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </section>
        </div>
      </main>
    </div>
  )
}
