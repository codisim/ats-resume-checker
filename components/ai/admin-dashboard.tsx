"use client"

import { useState } from "react"
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
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
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

const chartConfig = {
  users: {
    label: "New users",
    color: "var(--chart-1)",
  },
  analyses: {
    label: "Analyses",
    color: "var(--chart-2)",
  },
}

function MetricCard({ metric }: { metric: AdminDashboardMetric }) {
  const Icon = metricIcons[metric.label as keyof typeof metricIcons] ?? BarChart3

  return (
    <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
      <CardContent className="flex items-start gap-4 p-5">
        <div className={cn("grid size-11 place-items-center rounded-2xl", metric.iconTone)}>
          <Icon className="size-5" />
        </div>
        <div>
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

export function AdminDashboard({ data }: AdminDashboardProps) {
  const pageSize = 10
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(data.users.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const visibleUsers = data.users.slice(start, start + pageSize)

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
            Admin dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            User overview and system analytics
          </h1>
          <p className="max-w-3xl text-sm text-slate-500 sm:text-base">
            This panel is visible only to <span className="font-medium text-slate-700">waliullah9099@gmail.com</span>. It shows the newest users first, with all-time totals and recent activity trends.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-xl text-slate-900">
              Weekly growth
            </CardTitle>
            <CardDescription>
              New users versus analyses created over the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer config={chartConfig} className="min-h-[320px] w-full">
              <BarChart data={data.trend} margin={{ left: 0, right: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                />
                <YAxis tickLine={false} axisLine={false} width={32} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar
                  dataKey="users"
                  fill="var(--color-users)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="analyses"
                  fill="var(--color-analyses)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <span className="mr-2 inline-block size-2 rounded-full bg-sky-500" />
                New users
              </Badge>
              <Badge
                variant="outline"
                className="border-indigo-200 bg-indigo-50 text-indigo-700"
              >
                <span className="mr-2 inline-block size-2 rounded-full bg-indigo-500" />
                Analyses
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-xl text-slate-900">
              Database totals
            </CardTitle>
            <CardDescription>
              Quick snapshot of the current content in production.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total users</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {data.totalUsers}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">New users</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {data.newUsers}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total resumes</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {data.totalResumes}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total analyses</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {data.totalAnalyses}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
        <CardHeader className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CardTitle className="text-xl text-slate-900">
              All users
            </CardTitle>
            <CardDescription>
              Sorted by newest sign-up first.
            </CardDescription>
          </div>
          <div className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Resumes</TableHead>
                <TableHead className="pr-6 text-right">Analyses</TableHead>
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
                    <TableRow key={user.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9">
                            <AvatarImage src={user.image ?? undefined} alt={user.name ?? user.email} />
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
                      <TableCell className="max-w-[260px] truncate text-slate-600">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {user.createdAt}
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-900">
                        {user.resumes}
                      </TableCell>
                      <TableCell className="pr-6 text-right font-medium text-slate-900">
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

          <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              {data.users.length > 0
                ? `Showing ${start + 1}-${Math.min(
                    start + pageSize,
                    data.users.length
                  )} of ${data.users.length} users`
                : "No users available"}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="gap-2"
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                className="gap-2"
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
