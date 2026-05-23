import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/faq/FAQ";
import Features from "@/components/home/featutes/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/how-it-works/HowItWorks";
import GlobalMap from "@/components/home/map/GlobalMap";
import Pricing from "@/components/home/pricing/Pricing";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import type { Metadata } from "next";

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

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <GlobalMap />
      <CTA />
      <Footer />
    </>
  );
}
