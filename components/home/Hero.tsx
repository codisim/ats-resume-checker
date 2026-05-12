"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 160;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      for (const s of stars) {
        const a = 0.2 + 0.6 * Math.abs(Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0A0F0D] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">

      {/* Star canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle radial glow — teal center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,200,150,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">

        {/* Badge */}
        <motion.div {...fade(0.1)}>
          <div className="inline-flex items-center gap-2 bg-[#00C896]/10 border border-[#00C896]/25 rounded-full px-4 py-1.5 mb-7">
            <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
            <span className="text-[11px] font-medium text-[#00C896] tracking-wide">
              Free — 12 analyses every week
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.2)}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight mb-5"
        >
          Your resume is getting{" "}
          <span className="text-[#EF4444]">rejected</span> before
          <br className="hidden sm:block" /> a{" "}
          <span className="text-[#00C896]">human</span> sees it
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fade(0.3)}
          className="text-[15px] text-white/50 leading-relaxed max-w-lg mb-8"
        >
          75% of resumes never reach a recruiter. Our AI scans, scores, and
          rewrites your resume to pass any ATS — in seconds.
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fade(0.4)} className="flex items-center gap-3 mb-6 flex-wrap justify-center">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 text-sm font-semibold text-[#0A0F0D] bg-[#00C896] hover:bg-[#00A87E] px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00C896]/20"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="#0A0F0D" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Check my resume free
          </Link>
          <a
            href="#how-it-works"
            className="text-sm text-white/50 hover:text-white border border-white/12 hover:border-white/25 px-6 py-3 rounded-full transition-all"
          >
            See how it works
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          {...fade(0.5)}
          className="flex items-center justify-center gap-4 flex-wrap mb-14"
        >
          {["No credit card", "12 free scans/week", "Results in 10 seconds"].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[12px] text-white/35">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </div>
          ))}
        </motion.div>

        {/* Result card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[560px] bg-[#111816] border border-white/8 rounded-2xl overflow-hidden"
        >
          {/* Card header */}
          <div className="px-5 py-4 border-b border-white/7">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-medium text-white/30 tracking-widest">ATS ANALYSIS RESULT</span>
              <div className="flex items-center gap-1.5 bg-red-500/12 border border-red-500/25 rounded-full px-3 py-1">
                <span className="text-[12px] font-bold text-red-400">38</span>
                <span className="text-[10px] text-red-400/60">/ 100 · Before</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-white/7 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "38%" }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                  className="h-full bg-red-500 rounded-full"
                />
              </div>
              <span className="text-[11px] text-white/25">38%</span>
            </div>
          </div>

          {/* Card body */}
          <div className="p-5">
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Missing skills */}
              <div className="bg-white/[0.04] rounded-xl p-3.5">
                <p className="text-[10px] font-medium text-white/30 tracking-widest mb-2.5">MISSING SKILLS</p>
                <div className="flex flex-col gap-1.5">
                  {["React.js", "TypeScript", "REST APIs", "Agile / Scrum"].map((s) => (
                    <div key={s} className="flex items-center gap-2 text-[11px] text-white/55">
                      <span className="size-1 rounded-full bg-red-500 flex-shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              {/* Strengths */}
              <div className="bg-white/[0.04] rounded-xl p-3.5">
                <p className="text-[10px] font-medium text-white/30 tracking-widest mb-2.5">STRENGTHS</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    { t: "Python skills", c: "bg-[#00C896]" },
                    { t: "3 yrs experience", c: "bg-[#00C896]" },
                    { t: "Education match", c: "bg-amber-400" },
                    { t: "Soft skills", c: "bg-amber-400" },
                  ].map((s) => (
                    <div key={s.t} className="flex items-center gap-2 text-[11px] text-white/55">
                      <span className={`size-1 rounded-full flex-shrink-0 ${s.c}`} />
                      {s.t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI rewrite box */}
            <div className="bg-[#00C896]/[0.06] border border-[#00C896]/15 rounded-xl p-4">
              <p className="text-[10px] font-medium text-[#00C896] tracking-widest mb-2">AI REWRITTEN SUMMARY</p>
              <p className="text-[11px] text-white/50 leading-relaxed mb-3">
                <span className="text-white/80 font-medium">Results-driven software engineer</span> with 3+ years
                building scalable web apps using{" "}
                <span className="text-white/80 font-medium">React.js, TypeScript</span> and REST APIs.
                Delivered 4 production features in Agile sprints, reducing load time by 40%...
              </p>
              <div className="flex items-center justify-between bg-[#00C896]/10 rounded-lg px-4 py-2.5">
                <div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="text-xl font-bold text-[#00C896]"
                  >
                    87 / 100
                  </motion.span>
                  <p className="text-[10px] text-[#00C896]/60 mt-0.5">ATS score after rewrite</p>
                </div>
                <span className="text-[11px] text-white/25">+49 pts →</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fade(0.7)}
          className="flex items-center justify-center mt-8 bg-[#111816] border border-white/7 rounded-xl overflow-hidden w-full max-w-sm"
        >
          {[
            { n: "28K+", l: "Resumes analyzed" },
            { n: "94%", l: "ATS pass rate" },
            { n: "10s", l: "Avg. scan time" },
          ].map((s, i) => (
            <div
              key={i}
              className={`flex-1 py-4 text-center ${i < 2 ? "border-r border-white/7" : ""}`}
            >
              <span className="block text-lg font-bold text-white">{s.n}</span>
              <span className="block text-[10px] text-white/30 mt-0.5">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}