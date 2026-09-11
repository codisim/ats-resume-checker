import { NextResponse } from "next/server"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { getOrCreateDbUser } from "@/lib/auth-user"

export const runtime = "nodejs"

const resumeUpdateSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
})

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  const dbUser = await getOrCreateDbUser()
  if (!dbUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const resume = await prisma.resume.findFirst({
    where: {
      id,
      userId: dbUser.id,
    },
    select: {
      id: true,
      fileName: true,
      fileUrl: true,
      rawText: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!resume) {
    return NextResponse.json({ error: "Resume not found." }, { status: 404 })
  }

  return NextResponse.json(resume)
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
  const parsed = resumeUpdateSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid resume payload." },
      { status: 400 }
    )
  }

  const existing = await prisma.resume.findFirst({
    where: {
      id,
      userId: dbUser.id,
    },
    select: {
      id: true,
    },
  })

  if (!existing) {
    return NextResponse.json({ error: "Resume not found." }, { status: 404 })
  }

  await prisma.resume.update({
    where: {
      id,
    },
    data: {
      fileName: parsed.data.fileName,
    },
  })

  return NextResponse.json({ success: true })
}
