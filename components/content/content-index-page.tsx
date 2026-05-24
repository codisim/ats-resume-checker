import Footer from "@/components/shared/footer/Footer"
import Navbar from "@/components/shared/navbar/Navbar"
import { Badge } from "@/components/ui/badge"
import { ContentGrid } from "./content-grid"
import type { ContentKind, ContentRecord } from "@/lib/content"
import { contentKindLabels } from "@/lib/content"

export function ContentIndexPage({
  kind,
  items,
  description,
}: {
  kind: ContentKind
  items: ContentRecord[]
  description: string
}) {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pt-28">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[32rem]"
          style={{
            background:
              "radial-gradient(circle_at_top_left,color-mix(in oklab, var(--primary) 20%, transparent),transparent 30%),radial-gradient(circle_at_top_right,color-mix(in oklab, var(--warning) 18%, transparent),transparent 28%)",
          }}
        />
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <Badge variant="secondary" className="rounded-full px-4 py-1.5">
              {contentKindLabels[kind]}
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {kind === "BLOG"
                ? "Ideas, tactics, and resume advice"
                : "Proof, outcomes, and real-world wins"}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="mt-12">
            {items.length > 0 ? (
              <ContentGrid kind={kind} items={items} />
            ) : (
              <div className="rounded-3xl border border-dashed border-border bg-card/70 p-10 text-center text-muted-foreground">
                No published content yet. Check back soon.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
