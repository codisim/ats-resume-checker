import type { Metadata } from "next"

import { ContentIndexPage } from "@/components/content/content-index-page"
import { listContent } from "@/lib/content.server"

export const metadata: Metadata = {
  title: "Blog | ATS Resume Checker and AI Cover Letter Writer",
  description:
    "Read practical advice about resumes, ATS optimization, and career growth.",
  alternates: {
    canonical: "/blog",
  },
}

export default async function BlogPage() {
  const items = await listContent("BLOG", true)

  return (
    <ContentIndexPage
      kind="BLOG"
      items={items}
      description="Short, actionable articles on resume writing, ATS optimization, and job search strategy."
    />
  )
}
