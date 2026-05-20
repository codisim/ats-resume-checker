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
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-none lg:ml-12">

            <motion.div {...fade(0.1)}>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 mb-7">
                    <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
                    <span className="text-[11px] font-medium text-emerald-700 tracking-wide">
                        Free — 12 analyses every week
                    </span>
                </div>
            </motion.div>

            <motion.h1
                {...fade(0.2)}
                className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-[67px] font-bold text-slate-900 leading-[1.08] tracking-tight mb-5"
            >
                Your resume is getting{" "}
                <span className="text-slate-700">rejected</span> before
                <br className="hidden sm:block" /> a{" "}
                <span className="text-[#00C896]">human</span> sees it
            </motion.h1>

            <motion.p
                {...fade(0.3)}
                className="max-w-xl text-[15px] leading-relaxed text-slate-600 lg:text-base lg:leading-8 mb-8"
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
                    className="flex items-center gap-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v12M1 7h12" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    Check my resume free
                </Link>
                <a
                    href="#how-it-works"
                    className="text-sm text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 px-6 py-3 rounded-full transition-all bg-white"
                >
                    See how it works
                </a>
            </motion.div>

            <motion.div
                {...fade(0.5)}
                className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
                {["No credit card", "12 free scans/week", "Results in 10 seconds"].map((text) => (
                    <div key={text} className="flex items-center gap-1.5 text-[12px] text-slate-500">
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
