import { NextResponse } from "next/server"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { getOrCreateDbUser } from "@/lib/auth-user"

export const runtime = "nodejs"

const applicationSchema = z.object({
  company: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  status: z.enum(["APPLIED", "SCREENING", "INTERVIEW", "OFFER", "REJECTED"]),
  appliedDate: z.string().trim().min(1),
  salary: z.string().trim().max(80).optional().or(z.literal("")),
  url: z.string().trim().url().optional().or(z.literal("")),
  notes: z.string().trim().max(5000).optional().or(z.literal("")),
  resumeId: z.string().trim().min(1).optional().or(z.literal("")),
})

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

function parseDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  const dbUser = await getOrCreateDbUser()
  if (!dbUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)
  const parsed = applicationSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid application payload.",
      },
      { status: 400 }
    )
  }

  const existing = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId: dbUser.id,
    },
    select: {
      id: true,
    },
  })

  if (!existing) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 })
  }

  const appliedDate = parseDate(parsed.data.appliedDate)
  if (!appliedDate) {
    return NextResponse.json(
      { error: "Applied date is invalid." },
      { status: 400 }
    )
  }

  const resumeId = parsed.data.resumeId || null

  if (resumeId) {
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId: dbUser.id,
      },
      select: { id: true },
    })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found." }, { status: 404 })
    }
  }

  await prisma.jobApplication.update({
    where: {
      id,
    },
    data: {
      company: parsed.data.company,
      role: parsed.data.role,
      status: parsed.data.status,
      appliedDate,
      salary: parsed.data.salary || null,
      url: parsed.data.url || null,
      notes: parsed.data.notes || null,
      resumeId,
    },
  })

  return NextResponse.json({ success: true })
}
