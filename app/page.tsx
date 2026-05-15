import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/faq/FAQ";
import Features from "@/components/home/featutes/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/how-it-works/HowItWorks";
import GlobalMap from "@/components/home/map/GlobalMap";
import Pricing from "@/components/home/pricing/Pricing";
import Footer from "@/components/shared/navbar/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

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
