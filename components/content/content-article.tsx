import Link from "next/link"
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { contentKindLabels, deriveExcerpt, estimateReadingTime, type ContentRecord } from "@/lib/content"

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(value)
}

export function ContentArticle({
  item,
  backHref,
}: {
  item: ContentRecord
  backHref: string
}) {
  const readingTime = estimateReadingTime(item.content)

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Button asChild variant="ghost" className="mb-8 rounded-full px-3 text-muted-foreground">
        <Link href={backHref}>
          <ArrowLeft className="size-4" />
          Back to {contentKindLabels[item.kind]}
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{contentKindLabels[item.kind]}</Badge>
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            {item.published ? "Published" : "Draft"}
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {item.excerpt || deriveExcerpt(item.content)}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {formatDate(item.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-4" />
              {readingTime} min read
            </span>
            <span>/{item.slug}</span>
          </div>
        </div>

        {item.coverImage ? (
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.coverImage}
              alt={item.title}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}

        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardContent className="px-6 py-8">
              <div
                className="content-body space-y-6 text-base leading-8 text-foreground"
                dangerouslySetInnerHTML={{
                  __html: (item.content || "").replace(/<script[\s\S]*?<\/script>/gi, ""),
                }}
              />
          </CardContent>
        </Card>
      </div>
    </article>
  )
}
