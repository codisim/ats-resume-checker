import Link from "next/link"
import { FileText, Upload } from "lucide-react"

import { AiStaticPage } from "@/components/ai/ai-static-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import prisma from "@/lib/prisma"
import { getOrCreateDbUser } from "@/lib/auth-user"
import { getAiDashboardData } from "../lib/dashboard-data"

type ResumeRow = {
  id: string
  fileName: string
  fileUrl: string
  createdAt: Date
  updatedAt: Date
  analysisCount: number
  latestAnalysisAt: Date | null
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value)
}

function SummaryTile({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{note}</p>
    </div>
  )
}

export default async function ResumesPage() {
  const [dashboard, dbUser] = await Promise.all([
    getAiDashboardData(),
    getOrCreateDbUser(),
  ])

  if (!dbUser) {
    return (
      <AiStaticPage
        navigation={dashboard.navigation}
        userName={dashboard.header.userName}
        subtitle="Sign in to manage your resume library."
        weeklyUsage={dashboard.header.weeklyUsage}
        icon={FileText}
        title="Resumes"
        description="Your uploaded resumes will appear here once you're signed in."
      >
        <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
          Sign in to upload, review, and reuse resumes across your analyses.
        </div>
      </AiStaticPage>
    )
  }

  const rawResumes = await prisma.resume.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fileName: true,
      fileUrl: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          analyses: true,
        },
      },
      analyses: {
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  })

  const resumes: ResumeRow[] = rawResumes.map((resume) => ({
    id: resume.id,
    fileName: resume.fileName,
    fileUrl: resume.fileUrl,
    createdAt: resume.createdAt,
    updatedAt: resume.updatedAt,
    analysisCount: resume._count.analyses,
    latestAnalysisAt: resume.analyses[0]?.createdAt ?? null,
  }))

  const totalResumes = resumes.length
  const analyzedResumes = resumes.filter((resume) => resume.analysisCount > 0).length
  const totalAnalyses = resumes.reduce((sum, resume) => sum + resume.analysisCount, 0)
  const latestResume = resumes[0]

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="Review every resume you have uploaded and how often each one is used."
      weeklyUsage={dashboard.header.weeklyUsage}
      icon={FileText}
      title="Resumes"
      description="A live library of uploaded resumes tied to your analyses."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryTile
          label="Total resumes"
          value={formatCount(totalResumes)}
          note="Stored in your account"
        />
        <SummaryTile
          label="Analyzed resumes"
          value={formatCount(analyzedResumes)}
          note="Used in at least one analysis"
        />
        <SummaryTile
          label="Total analyses"
          value={formatCount(totalAnalyses)}
          note="Across all resume uploads"
        />
        <SummaryTile
          label="Latest upload"
          value={latestResume ? formatDate(latestResume.createdAt) : "No uploads"}
          note={latestResume ? latestResume.fileName : "Upload your first resume"}
        />
      </div>

      {resumes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">
                No resumes uploaded yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload a resume from the analysis dashboard and it will appear here
                automatically.
              </p>
            </div>
            <Button asChild className="w-fit">
              <Link href="/ai">
                <Upload className="size-4" />
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/60">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="px-4 py-3">File name</TableHead>
                <TableHead className="px-4 py-3">Uploaded</TableHead>
                <TableHead className="px-4 py-3">Updated</TableHead>
                <TableHead className="px-4 py-3">Analyses</TableHead>
                <TableHead className="px-4 py-3">Latest analysis</TableHead>
                <TableHead className="px-4 py-3 text-right">File</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resumes.map((resume) => {
                const isExternalUrl = /^https?:\/\//.test(resume.fileUrl)

                return (
                  <TableRow key={resume.id}>
                    <TableCell className="px-4 py-4 font-medium text-foreground">
                      {resume.fileName}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-muted-foreground">
                      {formatDate(resume.createdAt)}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-muted-foreground">
                      {formatDate(resume.updatedAt)}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge variant="outline" className="border-border/70 bg-card/80">
                        {formatCount(resume.analysisCount)}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-muted-foreground">
                      {resume.latestAnalysisAt
                        ? formatDate(resume.latestAnalysisAt)
                        : "Not analyzed yet"}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-right">
                      {isExternalUrl ? (
                        <Button asChild variant="outline" size="sm">
                          <a href={resume.fileUrl} target="_blank" rel="noreferrer">
                            Open file
                          </a>
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Stored locally
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </AiStaticPage>
  )
}
