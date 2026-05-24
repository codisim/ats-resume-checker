import type { Metadata } from "next"

import { ContentIndexPage } from "@/components/content/content-index-page"
import { listContent } from "@/lib/content.server"

export const metadata: Metadata = {
  title: "Case Studies | ATS Resume Checker",
  description:
    "Explore real use cases, outcomes, and stories from ATS improvements.",
  alternates: {
    canonical: "/case-studies",
  },
}

export default async function CaseStudiesPage() {
  const items = await listContent("CASE_STUDY", true)

  return (
    <ContentIndexPage
      kind="CASE_STUDY"
      items={items}
      description="Real examples, before-and-after stories, and results from content published by the team."
    />
  )
}
