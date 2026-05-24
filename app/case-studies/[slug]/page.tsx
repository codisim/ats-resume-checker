import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ContentDetailPage } from "@/components/content/content-detail-page"
import { getContentBySlug } from "@/lib/content.server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await getContentBySlug("CASE_STUDY", slug)

  if (!item || !item.published) {
    return {}
  }

  return {
    title: `${item.title} | Case study`,
    description: item.excerpt || "Read the latest case study.",
    alternates: {
      canonical: `/case-studies/${item.slug}`,
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getContentBySlug("CASE_STUDY", slug)

  if (!item || !item.published) {
    notFound()
  }

  return <ContentDetailPage item={item} backHref="/case-studies" />
}
