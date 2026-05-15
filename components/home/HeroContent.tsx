"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function HeroContent() {
    return (
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-none">

            <motion.div {...fade(0.1)}>
                <div className="inline-flex items-center gap-2 bg-[#00C896]/10 border border-[#00C896]/25 rounded-full px-4 py-1.5 mb-7">
                    <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
                    <span className="text-[11px] font-medium text-[#00C896] tracking-wide">
                        Free — 12 analyses every week
                    </span>
                </div>
            </motion.div>

            <motion.h1
                {...fade(0.2)}
                className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-5"
            >
                Your resume is getting{" "}
                <span className="text-[#EF4444]">rejected</span> before
                <br className="hidden sm:block" /> a{" "}
                <span className="text-[#00C896]">human</span> sees it
            </motion.h1>

            <motion.p
                {...fade(0.3)}
                className="max-w-xl text-[15px] leading-relaxed text-white/50 lg:text-base lg:leading-8 mb-8"
            >
                75% of resumes never reach a recruiter. Our AI scans, scores, and
                rewrites your resume to pass any ATS — in seconds.
            </motion.p>

            <motion.div
                {...fade(0.4)}
                className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
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

            <motion.div
                {...fade(0.5)}
                className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
                {["No credit card", "12 free scans/week", "Results in 10 seconds"].map((text) => (
                    <div key={text} className="flex items-center gap-1.5 text-[12px] text-white/35">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {text}
                    </div>
                ))}
            </motion.div>

        </div>
    );
}
