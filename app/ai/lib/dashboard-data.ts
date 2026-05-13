import { readFile } from "node:fs/promises"
import { join } from "node:path"

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

export type DashboardStat = {
  label: string
  value: string
  note: string
  iconKey: string
  iconTone: string
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
  stats: DashboardStat[]
}

async function readJson<T>(fileName: string): Promise<T> {
  const filePath = join(process.cwd(), "app/ai/fakedb", fileName)
  const contents = await readFile(filePath, "utf8")
  return JSON.parse(contents) as T
}

export async function getAiDashboardData(): Promise<DashboardDb> {
  const [header, navigation, previousAnalyses, stats] = await Promise.all([
    readJson<DashboardHeader>("header.json"),
    readJson<DashboardNavigationItem[]>("navigation.json"),
    readJson<DashboardAnalysis[]>("analyses.json"),
    readJson<DashboardStat[]>("stats.json"),
  ])

  return {
    header,
    navigation,
    previousAnalyses,
    stats,
  }
}
