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
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5">
                    <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                    <span className="text-[11px] font-medium tracking-wide text-primary">
                        Free — 7 analyses every week
                    </span>
                </div>
            </motion.div>

            <motion.h1
                {...fade(0.2)}
                className="mb-5 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl 2xl:text-[67px]"
            >
                Your resume is getting{" "}
                <span className="text-muted-foreground">rejected</span> before
                <br className="hidden sm:block" /> a{" "}
                <span className="text-primary">human</span> sees it
            </motion.h1>

            <motion.p
                {...fade(0.3)}
                className="mb-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground lg:text-base lg:leading-8"
            >
                75% of resumes never reach a recruiter. Paste a job description,
                get an ATS score for that role, and download a rewrite aimed at
                that posting — in seconds.
            </motion.p>

            <motion.div
                {...fade(0.4)}
                className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
                <Link
                    href="/sign-up"
                    className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    Check my resume free
                </Link>
                <a
                    href="#how-it-works"
                    className="rounded-full border border-border bg-card px-6 py-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
                >
                    See how it works
                </a>
            </motion.div>

            <motion.div
                {...fade(0.5)}
                className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
                {["No credit card", "7 free scans/week", "Results in 10 seconds"].map((text) => (
                    <div key={text} className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {text}
                    </div>
                ))}
            </motion.div>

        </div>
    );
}
