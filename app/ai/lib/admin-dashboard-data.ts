import prisma from "@/lib/prisma"

export const ADMIN_EMAIL = "waliullah9099@gmail.com"
export const ADMIN_PAGE_SIZE = 10

export type AdminDashboardMetric = {
  label: string
  value: string
  note: string
  iconTone: string
}

export type AdminDashboardTrendPoint = {
  label: string
  users: number
  analyses: number
}

export type AdminDashboardUserRow = {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: string
  resumes: number
  analyses: number
}

export type AdminDashboardData = {
  metrics: AdminDashboardMetric[]
  trend: AdminDashboardTrendPoint[]
  users: AdminDashboardUserRow[]
  totalUsers: number
  totalResumes: number
  totalAnalyses: number
  newUsers: number
}

type UserRecord = {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: Date
  _count: {
    resumes: number
    analyses: number
  }
}

function toDayKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")

  return `${year}-${month}-${day}`
}

function toDayLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date)
}

function createDayBuckets(days: number) {
  const today = new Date()
  const buckets: Array<{ date: Date; key: string; label: string }> = []

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - offset)
    date.setHours(0, 0, 0, 0)
    buckets.push({
      date,
      key: toDayKey(date),
      label: toDayLabel(date),
    })
  }

  return buckets
}

function getRecentWindowStart(days = 7) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  date.setHours(0, 0, 0, 0)
  return date
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const recentWindowStart = getRecentWindowStart()

  const [users, totalResumes, totalAnalyses, recentUsers, recentAnalyses] =
    await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          _count: {
            select: {
              resumes: true,
              analyses: true,
            },
          },
        },
      }) as Promise<UserRecord[]>,
      prisma.resume.count(),
      prisma.analysis.count(),
      prisma.user.findMany({
        where: {
          createdAt: { gte: recentWindowStart },
        },
        select: { createdAt: true },
      }),
      prisma.analysis.findMany({
        where: {
          createdAt: { gte: recentWindowStart },
        },
        select: { createdAt: true },
      }),
    ])

  const newUsers = recentUsers.length
  const totalUsers = users.length

  const recentUserCountByDay = new Map<string, number>()
  const recentAnalysisCountByDay = new Map<string, number>()

  recentUsers.forEach((user) => {
    const key = toDayKey(user.createdAt)
    recentUserCountByDay.set(key, (recentUserCountByDay.get(key) ?? 0) + 1)
  })

  recentAnalyses.forEach((analysis) => {
    const key = toDayKey(analysis.createdAt)
    recentAnalysisCountByDay.set(
      key,
      (recentAnalysisCountByDay.get(key) ?? 0) + 1
    )
  })

  const trend = createDayBuckets(7).map((bucket) => ({
    label: bucket.label,
    users: recentUserCountByDay.get(bucket.key) ?? 0,
    analyses: recentAnalysisCountByDay.get(bucket.key) ?? 0,
  }))

  return {
    metrics: [
      {
        label: "Total Users",
        value: `${totalUsers}`,
        note: "All registered accounts",
        iconTone: "bg-primary/10 text-primary",
      },
      {
        label: "New Users",
        value: `${newUsers}`,
        note: "Joined in the last 7 days",
        iconTone: "bg-success/10 text-success",
      },
      {
        label: "Total Resumes",
        value: `${totalResumes}`,
        note: "Stored across all users",
        iconTone: "bg-primary/10 text-primary",
      },
      {
        label: "Total Analyses",
        value: `${totalAnalyses}`,
        note: "AI review history",
        iconTone: "bg-warning/15 text-warning-foreground",
      },
    ],
    trend,
    users: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(user.createdAt),
      resumes: user._count.resumes,
      analyses: user._count.analyses,
    })),
    totalUsers,
    totalResumes,
    totalAnalyses,
    newUsers,
  }
}
