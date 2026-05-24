import { Prisma } from "@/src/generated/client"
import prisma from "@/lib/prisma"
import { z } from "zod"

export const contentKindValues = ["BLOG", "CASE_STUDY"] as const
export type ContentKind = (typeof contentKindValues)[number]

export const contentKindLabels: Record<ContentKind, string> = {
  BLOG: "Blog",
  CASE_STUDY: "Case study",
}

export const contentKindSlugs: Record<ContentKind, string> = {
  BLOG: "blog",
  CASE_STUDY: "case-studies",
}

export const contentKindSchema = z.enum(contentKindValues)

export const contentInputSchema = z.object({
  kind: contentKindSchema,
  title: z.string().trim().min(3, "Title is required."),
  slug: z.string().trim().optional().default(""),
  excerpt: z.string().trim().optional().default(""),
  coverImage: z.string().trim().optional().default(""),
  content: z.string().trim().min(1, "Content is required."),
  published: z.boolean().default(false),
})

export type ContentInput = z.infer<typeof contentInputSchema>

export type ContentRecord = {
  id: string
  kind: ContentKind
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  content: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

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

export function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function deriveExcerpt(content: string, fallback = "") {
  const cleaned = stripHtml(content)
  if (!cleaned) {
    return fallback
  }

  return cleaned.length > 180 ? `${cleaned.slice(0, 177)}...` : cleaned
}

export function estimateReadingTime(content: string) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

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

export function contentKindFromPath(pathname: string) {
  return pathname.includes("case-studies") ? "CASE_STUDY" : "BLOG"
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
