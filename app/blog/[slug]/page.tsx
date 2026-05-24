import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ContentDetailPage } from "@/components/content/content-detail-page"
import { getContentBySlug } from "@/lib/content"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const item = await getContentBySlug("BLOG", params.slug)

  if (!item || !item.published) {
    return {}
  }

  return {
    title: `${item.title} | Blog`,
    description: item.excerpt || "Read the latest blog article.",
    alternates: {
      canonical: `/blog/${item.slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const item = await getContentBySlug("BLOG", params.slug)

  if (!item || !item.published) {
    notFound()
  }

  return <ContentDetailPage item={item} backHref="/blog" />
}
