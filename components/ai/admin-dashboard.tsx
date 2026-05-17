"use client"

import { useMemo, useState } from "react"
import {
  BarChart3,
  Brain,
  ChevronLeft,
  ChevronRight,
  FileText,
  UserPlus,
  Users,
} from "lucide-react"
import {
  Cell,
  Pie,
  PieChart,
  PolarRadiusAxis,
} from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type {
  AdminDashboardData,
  AdminDashboardMetric,
} from "@/app/ai/lib/admin-dashboard-data"

type AdminDashboardProps = {
  data: AdminDashboardData
}

const metricIcons = {
  "Total Users": Users,
  "New Users": UserPlus,
  "Total Resumes": FileText,
  "Total Analyses": Brain,
} as const

const metricChartConfig = {
  totalUsers: {
    label: "Total users",
    color: "var(--chart-1)",
  },
  newUsers: {
    label: "New users",
    color: "var(--chart-2)",
  },
  totalResumes: {
    label: "Total resumes",
    color: "var(--chart-3)",
  },
  totalAnalyses: {
    label: "Total analyses",
    color: "var(--chart-4)",
  },
}

const metricChartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
]

const accentGlows = [
  "from-sky-500/25 via-sky-500/10 to-transparent",
  "from-emerald-500/25 via-emerald-500/10 to-transparent",
  "from-violet-500/25 via-violet-500/10 to-transparent",
  "from-amber-500/25 via-amber-500/10 to-transparent",
]

function MetricCard({
  metric,
  glowClass,
}: {
  metric: AdminDashboardMetric
  glowClass: string
}) {
  const Icon = metricIcons[metric.label as keyof typeof metricIcons] ?? BarChart3

  return (
    <Card className="group relative overflow-hidden border-white/50 bg-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1 hover:bg-white/70">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition-opacity group-hover:opacity-100",
          glowClass
        )}
      />
      <CardContent className="relative flex items-start gap-4 p-5">
        <div className={cn("grid size-11 place-items-center rounded-2xl border border-white/60 bg-white/60 shadow-sm backdrop-blur-xl", metric.iconTone)}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">{metric.label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {metric.value}
          </p>
          <p className="mt-1 text-sm text-slate-500">{metric.note}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set<number>([1, totalPages])

  for (
    let page = Math.max(2, currentPage - 1);
    page <= Math.min(totalPages - 1, currentPage + 1);
    page += 1
  ) {
    pages.add(page)
  }

  return Array.from(pages).sort((a, b) => a - b)
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  const pageSize = 10
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(data.users.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const visibleUsers = data.users.slice(start, start + pageSize)
  const visiblePages = getVisiblePages(currentPage, totalPages)

  const totalsChartData = useMemo(
    () => [
      {
        key: "totalUsers",
        label: "Users",
        value: data.totalUsers,
      },
      {
        key: "newUsers",
        label: "New",
        value: data.newUsers,
      },
      {
        key: "totalResumes",
        label: "Resumes",
        value: data.totalResumes,
      },
      {
        key: "totalAnalyses",
        label: "Analyses",
        value: data.totalAnalyses,
      },
    ],
    [data.newUsers, data.totalAnalyses, data.totalResumes, data.totalUsers]
  )

  const totalsPieData = useMemo(
    () =>
      totalsChartData.map((item, index) => ({
        ...item,
        fill: metricChartColors[index] ?? metricChartColors[0],
      })),
    [totalsChartData]
  )

  const grandTotal =
    data.totalUsers + data.newUsers + data.totalResumes + data.totalAnalyses

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/55 px-6 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_25%)]" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="mb-4 border-sky-200/70 bg-white/70 px-3 py-1 text-sky-700 backdrop-blur-xl"
            >
              Admin only
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              User overview and system analytics
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              This dashboard is available only to{" "}
              <span className="font-medium text-slate-900">
                waliullah9099@gmail.com
              </span>
              . It keeps the logic untouched while presenting a cleaner glass
              interface for the latest users, totals, and analysis activity.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-auto lg:min-w-[24rem]">
            {[
              { label: "Users", value: data.totalUsers },
              { label: "Resumes", value: data.totalResumes },
              { label: "Analyses", value: data.totalAnalyses },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/60 bg-white/55 px-4 py-3 text-left shadow-sm backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-semibold text-slate-900">
                  {formatCompact(item.value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            metric={metric}
            glowClass={accentGlows[index] ?? accentGlows[0]}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden border-white/50 bg-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <CardHeader className="border-b border-white/60 bg-white/35 pb-4">
            <CardTitle className="text-xl text-slate-900">
              Platform totals pie chart
            </CardTitle>
            <CardDescription className="text-slate-600">
              A glassmorphism donut view of the current totals.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 sm:p-6">
            <div className="relative mx-auto max-w-[420px]">
              <ChartContainer
                config={metricChartConfig}
                className="min-h-[360px] w-full"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent nameKey="key" labelKey="label" />}
                  />
                  <Pie
                    data={totalsPieData}
                    dataKey="value"
                    nameKey="key"
                    innerRadius={82}
                    outerRadius={130}
                    paddingAngle={3}
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={2}
                  >
                    {totalsPieData.map((entry) => (
                      <Cell key={entry.key} fill={entry.fill} />
                    ))}
                  </Pie>
                  <PolarRadiusAxis
                    tick={false}
                    axisLine={false}
                    orientation="inside"
                  />
                </PieChart>
              </ChartContainer>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border border-white/70 bg-white/70 px-6 py-5 text-center shadow-lg backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Total data
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                    {formatCompact(grandTotal)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Users + resumes + analyses
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {totalsPieData.map((item) => (
                <div
                  key={item.key}
                  className="rounded-2xl border border-white/60 bg-white/55 px-4 py-3 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">
                        {formatCompact(item.value)}
                      </p>
                    </div>
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-white/50 bg-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <CardHeader className="border-b border-white/60 bg-white/35 pb-4">
            <CardTitle className="text-xl text-slate-900">
              Data snapshot
            </CardTitle>
            <CardDescription className="text-slate-600">
              Quick read of the current production totals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-5 sm:p-6">
            {[
              {
                label: "Total users",
                value: data.totalUsers,
                tone: "bg-sky-100 text-sky-700",
              },
              {
                label: "New users",
                value: data.newUsers,
                tone: "bg-emerald-100 text-emerald-700",
              },
              {
                label: "Total resumes",
                value: data.totalResumes,
                tone: "bg-violet-100 text-violet-700",
              },
              {
                label: "Total analyses",
                value: data.totalAnalyses,
                tone: "bg-amber-100 text-amber-700",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/60 bg-white/50 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {item.label}
                    </p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                      {item.value}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("border-0 shadow-none", item.tone)}
                  >
                    Live
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="overflow-hidden border-white/50 bg-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <CardHeader className="flex flex-col gap-2 border-b border-white/60 bg-white/35 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CardTitle className="text-xl text-slate-900">All users</CardTitle>
            <CardDescription className="text-slate-600">
              Sorted by newest sign-up first in a shadcn-style table.
            </CardDescription>
          </div>
          <div className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-hidden rounded-b-[1.75rem] border-t border-white/60">
            <Table className="border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="border-slate-200/80 bg-slate-50/80 hover:bg-transparent">
                  <TableHead className="border-b border-slate-200/80 bg-slate-50/80 pl-6 text-slate-600">
                    User
                  </TableHead>
                  <TableHead className="border-b border-slate-200/80 bg-slate-50/80 text-slate-600">
                    Email
                  </TableHead>
                  <TableHead className="border-b border-slate-200/80 bg-slate-50/80 text-slate-600">
                    Joined
                  </TableHead>
                  <TableHead className="border-b border-slate-200/80 bg-slate-50/80 text-right text-slate-600">
                    Resumes
                  </TableHead>
                  <TableHead className="border-b border-slate-200/80 bg-slate-50/80 pr-6 text-right text-slate-600">
                    Analyses
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleUsers.length > 0 ? (
                  visibleUsers.map((user) => {
                    const initials = (user.name || user.email)
                      .split(" ")
                      .map((part) => part[0])
                      .filter(Boolean)
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()

                    return (
                      <TableRow
                        key={user.id}
                        className="border-slate-200/70 bg-white/45 hover:bg-white/70"
                      >
                        <TableCell className="border-b border-r border-slate-200/70 pl-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-9 ring-1 ring-white/70">
                              <AvatarImage
                                src={user.image ?? undefined}
                                alt={user.name ?? user.email}
                              />
                              <AvatarFallback className="bg-slate-200 text-xs font-medium text-slate-700">
                                {initials || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-slate-900">
                                {user.name || "Unnamed user"}
                              </p>
                              <p className="truncate text-xs text-slate-500">
                                {user.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[260px] border-b border-r border-slate-200/70 truncate text-slate-600">
                          {user.email}
                        </TableCell>
                        <TableCell className="border-b border-r border-slate-200/70 text-slate-600">
                          {user.createdAt}
                        </TableCell>
                        <TableCell className="border-b border-r border-slate-200/70 text-right font-medium text-slate-900">
                          {user.resumes}
                        </TableCell>
                        <TableCell className="border-b border-slate-200/70 pr-6 text-right font-medium text-slate-900">
                          {user.analyses}
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-slate-500">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/60 bg-white/35 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              {data.users.length > 0
                ? `Showing ${start + 1}-${Math.min(
                    start + pageSize,
                    data.users.length
                )} of ${data.users.length} users`
                : "No users available"}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="gap-2 rounded-full border-slate-200/80 bg-white/80 px-4 shadow-sm backdrop-blur-xl hover:bg-slate-50"
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/70 p-1 shadow-sm backdrop-blur-xl">
                {visiblePages.map((pageNumber) => {
                  const isActive = pageNumber === currentPage

                  return (
                    <Button
                      key={pageNumber}
                      type="button"
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPage(pageNumber)}
                      className={cn(
                        "h-8 min-w-8 rounded-full px-3",
                        isActive
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                className="gap-2 rounded-full border-slate-200/80 bg-white/80 px-4 shadow-sm backdrop-blur-xl hover:bg-slate-50"
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
