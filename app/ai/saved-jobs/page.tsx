import Link from "next/link"
import { BriefcaseBusiness, Inbox } from "lucide-react"

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

type ApplicationRow = {
  id: string
  company: string
  role: string
  status: "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED"
  appliedDate: Date
  salary: string | null
  url: string | null
  notes: string | null
  resume: {
    fileName: string | null
  } | null
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function formatStatus(status: ApplicationRow["status"]) {
  return status
    .split("_")
    .map((word) => word.toLowerCase())
    .join(" ")
}

function statusClass(status: ApplicationRow["status"]) {
  switch (status) {
    case "OFFER":
      return "border-success/20 bg-success/10 text-success"
    case "INTERVIEW":
      return "border-primary/20 bg-primary/10 text-primary"
    case "SCREENING":
      return "border-warning/20 bg-warning/10 text-warning-foreground"
    case "REJECTED":
      return "border-danger/20 bg-danger/10 text-danger"
    default:
      return "border-border/70 bg-card/80 text-muted-foreground"
  }
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

export default async function SavedJobsPage() {
  const [dashboard, dbUser] = await Promise.all([
    getAiDashboardData(),
    getOrCreateDbUser(),
  ])

  if (!dbUser) {
    return (
      <AiStaticPage
        navigation={dashboard.navigation}
        userName={dashboard.header.userName}
        subtitle="Sign in to manage your saved jobs."
        weeklyUsage={dashboard.header.weeklyUsage}
        icon={BriefcaseBusiness}
        title="Saved Jobs"
        description="Your tracked job applications will appear here once you're signed in."
      >
        <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
          Save applications to track status, salary, and the resume linked to each
          role.
        </div>
      </AiStaticPage>
    )
  }

  const applications = (await prisma.jobApplication.findMany({
    where: { userId: dbUser.id },
    orderBy: { appliedDate: "desc" },
    select: {
      id: true,
      company: true,
      role: true,
      status: true,
      appliedDate: true,
      salary: true,
      url: true,
      notes: true,
      resume: {
        select: {
          fileName: true,
        },
      },
    },
  })) as ApplicationRow[]

  const totalApplications = applications.length
  const interviews = applications.filter((item) => item.status === "INTERVIEW").length
  const offers = applications.filter((item) => item.status === "OFFER").length
  const activePipeline = applications.filter(
    (item) => item.status === "APPLIED" || item.status === "SCREENING"
  ).length

  return (
    <AiStaticPage
      navigation={dashboard.navigation}
      userName={dashboard.header.userName}
      subtitle="Track the roles you care about and how each application is progressing."
      weeklyUsage={dashboard.header.weeklyUsage}
      icon={BriefcaseBusiness}
      title="Saved Jobs"
      description="A live application tracker built from your saved job records."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryTile
          label="Saved jobs"
          value={String(totalApplications)}
          note="Applications in your tracker"
        />
        <SummaryTile
          label="Active pipeline"
          value={String(activePipeline)}
          note="Applied or screening"
        />
        <SummaryTile
          label="Interviews"
          value={String(interviews)}
          note="Currently in interview stage"
        />
        <SummaryTile
          label="Offers"
          value={String(offers)}
          note="Applications with offers"
        />
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">
                No saved jobs yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add job applications here to keep status, resume, and notes together.
              </p>
            </div>
            <Button asChild className="w-fit">
              <Link href="/ai">
                <Inbox className="size-4" />
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
                <TableHead className="px-4 py-3">Role</TableHead>
                <TableHead className="px-4 py-3">Company</TableHead>
                <TableHead className="px-4 py-3">Status</TableHead>
                <TableHead className="px-4 py-3">Applied</TableHead>
                <TableHead className="px-4 py-3">Resume</TableHead>
                <TableHead className="px-4 py-3 text-right">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="px-4 py-4 font-medium text-foreground">
                    {application.role}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-muted-foreground">
                    {application.company}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Badge variant="outline" className={statusClass(application.status)}>
                      {formatStatus(application.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-muted-foreground">
                    {formatDate(application.appliedDate)}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-muted-foreground">
                    {application.resume?.fileName || "Not linked"}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right">
                    {application.url ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={application.url} target="_blank" rel="noreferrer">
                          Open job
                        </a>
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">No link</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AiStaticPage>
  )
}
