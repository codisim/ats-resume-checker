import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { getClerkUserEmail, isAdminEmail } from "@/lib/admin"
import {
  contentInputSchema,
  contentKindSchema,
  type ContentKind,
} from "@/lib/content"
import {
  createUniqueSlug,
  getContentBySlug,
  listContent,
  toContentSummary,
} from "@/lib/content.server"
import { Prisma } from "@/src/generated/client"
import prisma from "@/lib/prisma"

async function requireAdmin() {
  const clerkUser = await currentUser()
  const email = getClerkUserEmail(clerkUser)

  if (!isAdminEmail(email)) {
    return null
  }

  return clerkUser
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const kindParam = url.searchParams.get("kind")
  const publishedParam = url.searchParams.get("published")
  const allParam = url.searchParams.get("all")
  const adminUser =
    allParam === "true" || publishedParam === "false"
      ? await requireAdmin()
      : null

  const kind = kindParam && contentKindSchema.safeParse(kindParam).success
    ? (kindParam as ContentKind)
    : undefined

  if ((allParam === "true" || publishedParam === "false") && !adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const items = await listContent(
    kind,
    publishedParam === "true" || (!adminUser && publishedParam !== "false")
  )

  const filteredItems =
    publishedParam === "false" && adminUser
      ? items.filter((item) => !item.published)
      : items

  return NextResponse.json({ items: filteredItems.map(toContentSummary) })
}

export async function POST(request: Request) {
  const clerkUser = await requireAdmin()
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = contentInputSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid content payload." },
      { status: 400 }
    )
  }

  const input = parsed.data
  const slug = await createUniqueSlug(input.slug || input.title, input.kind)
  const id = crypto.randomUUID()

  await prisma.$executeRaw(Prisma.sql`
    INSERT INTO "Blog" (
      "id",
      "kind",
      "title",
      "slug",
      "excerpt",
      "coverImage",
      "content",
      "published",
      "createdAt",
      "updatedAt"
    ) VALUES (
      ${id},
      ${input.kind},
      ${input.title},
      ${slug},
      ${input.excerpt || null},
      ${input.coverImage || null},
      ${input.content},
      ${input.published},
      ${new Date()},
      ${new Date()}
    )
  `)

  const item = await getContentBySlug(input.kind, slug)

  return NextResponse.json({ item: item ? toContentSummary(item) : null })
}
