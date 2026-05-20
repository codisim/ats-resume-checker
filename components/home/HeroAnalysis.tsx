"use client";

import { motion } from "framer-motion";

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const MISSING_SKILLS = ["React.js", "TypeScript", "REST APIs", "Agile / Scrum"];

const STRENGTHS = [
    { label: "Python skills", color: "bg-primary" },
    { label: "3 yrs experience", color: "bg-primary" },
    { label: "Education match", color: "bg-warning" },
    { label: "Soft skills", color: "bg-warning" },
];

const STATS = [
    { value: "28+", label: "Resumes analyzed" },
    { value: "94%", label: "ATS pass rate" },
    { value: "10s", label: "Avg. scan time" },
];

export default function HeroAnalysis() {
    return (
        <div className="relative z-10 mx-auto mt-14 w-full max-w-[560px] xl:mx-0 xl:mt-0 xl:max-w-[620px]">

            {/* ATS result card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
                className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
                {/* Header */}
                <div className="border-b border-border px-5 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-medium tracking-widest text-muted-foreground">
                            ATS ANALYSIS RESULT
                        </span>
                        <div className="flex items-center gap-1.5 rounded-full border border-danger/20 bg-danger/10 px-3 py-1">
                            <span className="text-[12px] font-bold text-danger">38</span>
                            <span className="text-[10px] text-danger/70">/ 100 · Before</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "38%" }}
                                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                                className="h-full rounded-full bg-danger"
                            />
                        </div>
                        <span className="text-[11px] text-muted-foreground">38%</span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-3">

                        <div className="rounded-xl bg-secondary p-3.5">
                            <p className="mb-2.5 text-[10px] font-medium tracking-widest text-muted-foreground">
                                MISSING SKILLS
                            </p>
                            <div className="flex flex-col gap-1.5">
                                {MISSING_SKILLS.map((s) => (
                                    <div key={s} className="flex items-center gap-2 text-[11px] text-foreground">
                                        <span className="size-1 flex-shrink-0 rounded-full bg-danger" />
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl bg-secondary p-3.5">
                            <p className="mb-2.5 text-[10px] font-medium tracking-widest text-muted-foreground">
                                STRENGTHS
                            </p>
                            <div className="flex flex-col gap-1.5">
                                {STRENGTHS.map((s) => (
                                    <div key={s.label} className="flex items-center gap-2 text-[11px] text-foreground">
                                        <span className={`size-1 rounded-full flex-shrink-0 ${s.color}`} />
                                        {s.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* AI rewrite */}
                    <div className="rounded-xl border border-success/20 bg-success/10 p-4">
                        <p className="mb-2 text-[10px] font-medium tracking-widest text-success">
                            AI REWRITTEN SUMMARY
                        </p>
                        <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
                            <span className="font-medium text-foreground">Results-driven software engineer</span> with
                            3+ years building scalable web apps using{" "}
                            <span className="font-medium text-foreground">React.js, TypeScript</span> and REST APIs.
                            Delivered 4 production features in Agile sprints, reducing load time by 40%...
                        </p>
                        <div className="flex items-center justify-between rounded-lg bg-card px-4 py-2.5">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.6, ease: "easeOut" }}
                                    className="text-xl font-bold text-primary"
                                >
                                    87 / 100
                                </motion.span>
                                <p className="mt-0.5 text-[10px] text-success">ATS score after rewrite</p>
                            </div>
                            <span className="text-[11px] text-muted-foreground">+49 pts →</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                {...fade(0.7)}
                className="mt-6 flex items-center overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
                {STATS.map((s, i) => (
                    <div
                        key={s.value}
                        className={`flex-1 py-4 text-center ${i < STATS.length - 1 ? "border-r border-border" : ""}`}
                    >
                        <span className="block text-lg font-bold text-foreground">{s.value}</span>
                        <span className="mt-0.5 block text-[10px] text-muted-foreground">{s.label}</span>
                    </div>
                ))}
            </motion.div>

        </div>
    );
}
