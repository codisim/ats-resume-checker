import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/faq/FAQ";
import Features from "@/components/home/featutes/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/how-it-works/HowItWorks";
import GlobalMap from "@/components/home/map/GlobalMap";
import Pricing from "@/components/home/pricing/Pricing";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { ContentGrid } from "@/components/content/content-grid";
import { Button } from "@/components/ui/button";
import { listContent } from "@/lib/content.server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ATS Resume Checker | AI Resume Analysis for Job Seekers",
  description:
    "Analyze your resume against real job descriptions, uncover ATS issues, and get AI-powered recommendations to improve your chances of landing interviews.",
  keywords: [
    "ATS resume checker",
    "resume analysis",
    "AI resume checker",
    "resume score",
    "job description matching",
    "ATS optimization",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ATS Resume Checker | AI Resume Analysis for Job Seekers",
    description:
      "Analyze your resume against real job descriptions, uncover ATS issues, and get AI-powered recommendations to improve your chances of landing interviews.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS Resume Checker | AI Resume Analysis for Job Seekers",
    description:
      "Analyze your resume against real job descriptions, uncover ATS issues, and get AI-powered recommendations to improve your chances of landing interviews.",
  },
};

export default async function Home() {
  const latestBlogPosts = await listContent("BLOG", true)

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <section className="bg-background px-4 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-1 text-[11px] font-medium tracking-[0.18em] text-primary uppercase">
                Blog
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Resume tips, ATS tactics, and practical job-search advice
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                We regularly publish short, useful posts to help you improve
                your resume and get more interviews.
              </p>
            </div>

            <Button asChild variant="outline" className="rounded-full">
              <Link href="/blog">View all blog posts</Link>
            </Button>
          </div>

          {latestBlogPosts.length > 0 ? (
            <ContentGrid kind="BLOG" items={latestBlogPosts.slice(0, 3)} />
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/70 p-10 text-center text-muted-foreground">
              No published blog posts yet. Check back soon.
            </div>
          )}
        </div>
      </section>
      <Pricing />
      <FAQ />
      <GlobalMap />
      <CTA />
      <Footer />
    </>
  );
}
