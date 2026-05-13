import FAQ from "@/components/home/faq/FAQ";
import Features from "@/components/home/featutes/Features";
import Hero from "@/components/home/Hero";
import HeroAnalysis from "@/components/home/HeroAnalysis";
import HowItWorks from "@/components/home/how-it-works/HowItWorks";
import GlobalMap from "@/components/home/map/GlobalMap";
import Footer from "@/components/shared/navbar/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <HeroAnalysis />  */}
      <Features />
      <GlobalMap />
      <HowItWorks />
      <FAQ />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Button>Click me</Button>
      </div>

      <Footer />
    </>
  );
}
