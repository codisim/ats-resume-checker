import Footer from "@/components/shared/footer/Footer"
import Navbar from "@/components/shared/navbar/Navbar"
import { ContentArticle } from "./content-article"
import type { ContentRecord } from "@/lib/content"

export function ContentDetailPage({
  item,
  backHref,
}: {
  item: ContentRecord
  backHref: string
}) {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pt-24">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[26rem]"
          style={{
            background:
              "radial-gradient(circle_at_top_left,color-mix(in oklab, var(--primary) 18%, transparent),transparent 30%),radial-gradient(circle_at_top_right,color-mix(in oklab, var(--warning) 18%, transparent),transparent 28%)",
          }}
        />
        <ContentArticle item={item} backHref={backHref} />
      </main>
      <Footer />
    </>
  )
}
