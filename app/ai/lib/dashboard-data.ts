import prisma from "@/lib/prisma"
import { getOrCreateDbUser, getWeekStart } from "@/lib/auth-user"

export type DashboardNavigationItem = {
  label: string
  href: string
  active?: boolean
  iconKey: string
}

export type DashboardAnalysis = {
  score: number
  title: string
  date: string
  time: string
  label: string
  tone: "good" | "average" | "low"
  ring: "good" | "average" | "low"
}

export type AnalysisHistoryItem = {
  id: string
  title: string
  company: string | null
  resumeFileName: string | null
  jobDescription: string
  date: string
  time: string
  atsScore: number
  matchPercent: number
  label: string
  tone: "good" | "average" | "low"
  matchedSkills: string[]
  missingSkills: string[]
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  improvedSummary: string
}

export type DashboardStat = {
  label: string
  value: string
  note: string
  iconKey: string
  iconTone: string
}

type AnalysisRecord = {
  id: string
  createdAt: Date
  atsScore: number
  matchPercent: number
  missingSkills: unknown
  strengths: unknown
  weaknesses: unknown
  suggestions: unknown
  improvedSummary: string | null
  job?: {
    title: string | null
    company: string | null
    description: string
  } | null
  resume?: {
    fileName: string
  } | null
}

export type DashboardHeader = {
  userName: string
  subtitle: string
  weeklyUsage: {
    used: number
    limit: number
  }
}

type DashboardDb = {
  header: DashboardHeader
  navigation: DashboardNavigationItem[]
  previousAnalyses: DashboardAnalysis[]
  historyAnalyses: AnalysisHistoryItem[]
  stats: DashboardStat[]
}

const DEFAULT_WEEKLY_LIMIT = 7

export const dashboardNavigation: DashboardNavigationItem[] = [
  { label: "Home", href: "/", iconKey: "home" },
  { label: "Dashboard", href: "/ai", iconKey: "dashboard" },
  { label: "History", href: "/ai/analyses", iconKey: "analyses" },
  { label: "Resumes", href: "#", iconKey: "resumes" },
  { label: "Saved Jobs", href: "#", iconKey: "saved_jobs" },
  { label: "Usage", href: "#", iconKey: "usage" },
  { label: "Settings", href: "#", iconKey: "settings" },
  { label: "Billing", href: "#", iconKey: "billing" },
]

function toTimeLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}

function toDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function toTone(score: number): "good" | "average" | "low" {
  if (score >= 75) return "good"
  if (score >= 50) return "average"
  return "low"
}

function toLabel(score: number) {
  if (score >= 75) return "Good Match"
  if (score >= 50) return "Average Match"
  return "Needs Improvement"
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === "string")
}

function toHistoryItem(analysis: AnalysisRecord): AnalysisHistoryItem {
  const createdAt = analysis.createdAt
  const jobTitle = analysis.job?.title || "Untitled Job"

  return {
    id: analysis.id,
    title: jobTitle,
    company: analysis.job?.company || null,
    resumeFileName: analysis.resume?.fileName || null,
    jobDescription: analysis.job?.description || "",
    date: toDateLabel(createdAt),
    time: toTimeLabel(createdAt),
    atsScore: analysis.atsScore,
    matchPercent: analysis.matchPercent,
    label: toLabel(analysis.atsScore),
    tone: toTone(analysis.atsScore),
    matchedSkills: toStringArray(analysis.strengths),
    missingSkills: toStringArray(analysis.missingSkills),
    strengths: toStringArray(analysis.strengths),
    weaknesses: toStringArray(analysis.weaknesses),
    suggestions: toStringArray(analysis.suggestions),
    improvedSummary: analysis.improvedSummary || "",
  }
}

export async function getAiDashboardData(): Promise<DashboardDb> {
  const dbUser = await getOrCreateDbUser();

  if (!dbUser) {
    return {
      header: {
        userName: "there",
        subtitle: "Upload a resume to get real-time ATS feedback.",
        weeklyUsage: { used: 0, limit: DEFAULT_WEEKLY_LIMIT },
      },
      navigation: dashboardNavigation,
      previousAnalyses: [],
      historyAnalyses: [],
      stats: [],
    }
  }

  const currentWeekStart = getWeekStart()

  const [
    user,
    usage,
    analysisCount,
    resumeCount,
    recentAnalyses,
    historyAnalyses,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: dbUser.id },
      select: {
        name: true,
      },
    }),
    prisma.usage.findFirst({
      where: {
        userId: dbUser.id,
        weekStart: currentWeekStart,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.analysis.count({
      where: { userId: dbUser.id },
    }),
    prisma.resume.count({
      where: { userId: dbUser.id },
    }),
    prisma.analysis.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        job: true,
        resume: true,
      },
    }),
    prisma.analysis.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      include: {
        job: true,
        resume: true,
      },
    }),
  ])

  const averageScore =
    recentAnalyses.length > 0
      ? Math.round(
          recentAnalyses.reduce((total, analysis) => total + analysis.atsScore, 0) /
            recentAnalyses.length
        )
      : 0

  const weeklyLimit =
    (await prisma.subscription.findFirst({
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
    }))?.plan.weeklyLimit ?? DEFAULT_WEEKLY_LIMIT

  return {
    header: {
      userName: user?.name || "there",
      subtitle:
        recentAnalyses.length > 0
          ? "Your latest resume insights, history, and usage are loaded from the backend."
          : "Upload a resume to generate your first analysis.",
      weeklyUsage: {
        used: usage?.count ?? 0,
        limit: weeklyLimit,
      },
    },
    navigation: dashboardNavigation,
    previousAnalyses: recentAnalyses.map((analysis) => {
      const historyItem = toHistoryItem(analysis)

      return {
        score: historyItem.atsScore,
        title: historyItem.title,
        date: historyItem.date,
        time: historyItem.time,
        label: historyItem.label,
        tone: historyItem.tone,
        ring: historyItem.tone,
      }
    }),
    historyAnalyses: historyAnalyses.map(toHistoryItem),
    stats: [
      {
        label: "Total Analyses",
        value: `${analysisCount}`,
        note: "All time",
        iconKey: "analyses",
        iconTone: "bg-primary/10 text-primary",
      },
      {
        label: "Average ATS Score",
        value: `${averageScore}%`,
        note: "Across all analyses",
        iconKey: "average",
        iconTone: "bg-success/10 text-success",
      },
      {
        label: "Resumes Uploaded",
        value: `${resumeCount}`,
        note: "Stored in your account",
        iconKey: "resumes",
        iconTone: "bg-primary/10 text-primary",
      },
      {
        label: "Weekly Usage",
        value: `${usage?.count ?? 0} / ${weeklyLimit}`,
        note: "Scans used this week",
        iconKey: "weekly",
        iconTone: "bg-warning/15 text-warning-foreground",
      },
    ],
  }
}

export async function getAiAnalysisHistoryData() {
  const dbUser = await getOrCreateDbUser()

  if (!dbUser) {
    return {
      header: {
        userName: "there",
        subtitle: "Upload a resume to get real-time ATS feedback.",
        weeklyUsage: { used: 0, limit: DEFAULT_WEEKLY_LIMIT },
      },
      navigation: dashboardNavigation,
      analyses: [],
    }
  }

  const currentWeekStart = getWeekStart()

  const [user, usage, analyses, weeklyLimit] = await Promise.all([
    prisma.user.findUnique({
      where: { id: dbUser.id },
      select: { name: true },
    }),
    prisma.usage.findFirst({
      where: {
        userId: dbUser.id,
        weekStart: currentWeekStart,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.analysis.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      include: {
        job: true,
        resume: true,
      },
    }),
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
  ])

  return {
    header: {
      userName: user?.name || "there",
      subtitle: "Browse all of your saved resume analyses and open any one for full details.",
      weeklyUsage: {
        used: usage?.count ?? 0,
        limit: weeklyLimit?.plan.weeklyLimit ?? DEFAULT_WEEKLY_LIMIT,
      },
    },
    navigation: dashboardNavigation,
    analyses: analyses.map(toHistoryItem),
  }
}

export type { DashboardDb }
