import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { getClerkUserEmail, isAdminEmail } from "@/lib/admin"
import { contentInputSchema } from "@/lib/content"
import {
  createUniqueSlug,
  getContentById,
  toContentSummary,
} from "@/lib/content.server"
import { Prisma } from "@/src/generated/client"
import prisma from "@/lib/prisma"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

async function requireAdmin() {
  const clerkUser = await currentUser()
  const email = getClerkUserEmail(clerkUser)

  if (!isAdminEmail(email)) {
    return null
  }

  return clerkUser
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  const { id } = await params
  const clerkUser = await currentUser()
  const email = getClerkUserEmail(clerkUser)
  const isAdmin = isAdminEmail(email)
  const item = await getContentById(id)

  if (!item) {
    return NextResponse.json({ error: "Content not found." }, { status: 404 })
  }

  if (!item.published && !isAdmin) {
    return NextResponse.json({ error: "Content not found." }, { status: 404 })
  }

  return NextResponse.json({ item: toContentSummary(item) })
}

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  const clerkUser = await requireAdmin()
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)
  const parsed = contentInputSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid content payload." },
      { status: 400 }
    )
  }

  const existing = await getContentById(id)

  if (!existing) {
    return NextResponse.json({ error: "Content not found." }, { status: 404 })
  }

  const input = parsed.data
  const slug = await createUniqueSlug(input.slug || input.title, input.kind, id)

  await prisma.$executeRaw(Prisma.sql`
    UPDATE "Blog"
    SET
      "kind" = ${input.kind},
      "title" = ${input.title},
      "slug" = ${slug},
      "excerpt" = ${input.excerpt || null},
      "coverImage" = ${input.coverImage || null},
      "content" = ${input.content},
      "published" = ${input.published},
      "updatedAt" = ${new Date()}
    WHERE "id" = ${id}
  `)

  const item = await getContentById(id)

  return NextResponse.json({ item: item ? toContentSummary(item) : null })
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  const clerkUser = await requireAdmin()
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  await prisma.$executeRaw(Prisma.sql`
    DELETE FROM "Blog"
    WHERE "id" = ${id}
  `)

  return NextResponse.json({ success: true })
}
