import { Prisma } from "@/src/generated/client"

import prisma from "@/lib/prisma"
import {
  type ContentKind,
  type ContentRecord,
  normalizeSlug,
} from "@/lib/content"

const CONTENT_SELECT = Prisma.sql`
  SELECT
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
  FROM "Blog"
`

export async function listContent(kind?: ContentKind, publishedOnly = false) {
  const conditions: Prisma.Sql[] = []

  if (kind) {
    conditions.push(Prisma.sql`"kind" = ${kind}`)
  }

  if (publishedOnly) {
    conditions.push(Prisma.sql`"published" = true`)
  }

  const whereClause =
    conditions.length > 0
      ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
      : Prisma.empty

  return prisma.$queryRaw<ContentRecord[]>(
    Prisma.sql`${CONTENT_SELECT} ${whereClause} ORDER BY "createdAt" DESC`
  )
}

export async function getContentBySlug(kind: ContentKind, slug: string) {
  const items = await prisma.$queryRaw<ContentRecord[]>(
    Prisma.sql`${CONTENT_SELECT} WHERE "kind" = ${kind} AND "slug" = ${slug} LIMIT 1`
  )

  return items[0] ?? null
}

export async function getContentById(id: string) {
  const items = await prisma.$queryRaw<ContentRecord[]>(
    Prisma.sql`${CONTENT_SELECT} WHERE "id" = ${id} LIMIT 1`
  )

  return items[0] ?? null
}

export function toContentSummary(item: ContentRecord) {
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    coverImage: item.coverImage,
    content: item.content,
    published: item.published,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }
}

export async function createUniqueSlug(
  title: string,
  kind: ContentKind,
  excludeId?: string
) {
  const baseSlug = normalizeSlug(title) || "content"
  let nextSlug = baseSlug
  let suffix = 1

  while (true) {
    const conditions: Prisma.Sql[] = [
      Prisma.sql`"kind" = ${kind}`,
      Prisma.sql`"slug" = ${nextSlug}`,
    ]

    if (excludeId) {
      conditions.push(Prisma.sql`"id" <> ${excludeId}`)
    }

    const items = await prisma.$queryRaw<Array<{ id: string }>>(
      Prisma.sql`SELECT "id" FROM "Blog" WHERE ${Prisma.join(conditions, " AND ")} LIMIT 1`
    )

    if (items.length === 0) {
      return nextSlug
    }

    suffix += 1
    nextSlug = `${baseSlug}-${suffix}`
  }
}
