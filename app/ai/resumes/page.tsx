import { FileText } from "lucide-react"

import { AiStaticPage } from "@/components/ai/ai-static-page"
import { getAiDashboardData } from "../lib/dashboard-data"

export default async function ResumesPage() {
  const dashboard = await getAiDashboardData()

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="Manage the resumes you upload and keep your job search materials organized."
      weeklyUsage={dashboard.header.weeklyUsage}
      icon={FileText}
      title="Resumes"
      description="A dedicated place for uploaded resumes and resume-ready files."
    >
      <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-5 text-sm text-muted-foreground">
        Uploads and saved resume files can live here next. The sidebar link is now
        a real route, so users can navigate here directly.
      </div>
    </AiStaticPage>
  )
}
