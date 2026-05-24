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

export function contentKindFromPath(pathname: string) {
  return pathname.includes("case-studies") ? "CASE_STUDY" : "BLOG"
}
