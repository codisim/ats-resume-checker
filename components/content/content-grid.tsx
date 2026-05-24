import Link from "next/link"
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { ContentKind, ContentRecord } from "@/lib/content"
import { contentKindLabels, deriveExcerpt, estimateReadingTime } from "@/lib/content"

type ContentGridProps = {
  kind: ContentKind
  items: ContentRecord[]
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value)
}

export function ContentGrid({ kind, items }: ContentGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const readingTime = estimateReadingTime(item.content)
        const excerpt = item.excerpt || deriveExcerpt(item.content)
        const href =
          kind === "BLOG"
            ? `/blog/${item.slug}`
            : `/case-studies/${item.slug}`

        return (
          <Link key={item.id} href={href} className="group">
            <Card className="h-full overflow-hidden border-border/70 bg-card/95 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              <div className="relative aspect-[16/9] border-b border-border bg-gradient-to-br from-primary/15 via-background to-warning/15 p-4">
                {item.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-35"
                  />
                ) : null}
                <div className="relative flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-background/70 p-4 backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant={kind === "BLOG" ? "default" : "secondary"}>
                      {contentKindLabels[item.kind]}
                    </Badge>
                    <span className="rounded-full border border-border bg-background/90 px-3 py-1 text-xs text-muted-foreground">
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">
                    {excerpt}
                  </p>
                </div>
              </div>
              <CardContent className="space-y-4 p-5">
                <div className="space-y-2">
                  <h3 className="line-clamp-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {formatDate(item.createdAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" />
                      {readingTime} min read
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>/{item.slug}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-foreground">
                    Read more
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
