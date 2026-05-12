"use client";

import { motion } from "framer-motion";

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const MISSING_SKILLS = ["React.js", "TypeScript", "REST APIs", "Agile / Scrum"];

const STRENGTHS = [
    { label: "Python skills", color: "bg-[#00C896]" },
    { label: "3 yrs experience", color: "bg-[#00C896]" },
    { label: "Education match", color: "bg-amber-400" },
    { label: "Soft skills", color: "bg-amber-400" },
];

const STATS = [
    { value: "28K+", label: "Resumes analyzed" },
    { value: "94%", label: "ATS pass rate" },
    { value: "10s", label: "Avg. scan time" },
];

export default function HeroAnalysis() {
    return (
        <div className="relative z-10 w-full max-w-[560px] mx-auto mt-14">

            {/* ATS result card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
                className="w-full bg-[#111816] border border-white/8 rounded-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-white/7">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-medium text-white/30 tracking-widest">
                            ATS ANALYSIS RESULT
                        </span>
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

                {/* Body */}
                <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-3">

                        <div className="bg-white/[0.04] rounded-xl p-3.5">
                            <p className="text-[10px] font-medium text-white/30 tracking-widest mb-2.5">
                                MISSING SKILLS
                            </p>
                            <div className="flex flex-col gap-1.5">
                                {MISSING_SKILLS.map((s) => (
                                    <div key={s} className="flex items-center gap-2 text-[11px] text-white/55">
                                        <span className="size-1 rounded-full bg-red-500 flex-shrink-0" />
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/[0.04] rounded-xl p-3.5">
                            <p className="text-[10px] font-medium text-white/30 tracking-widest mb-2.5">
                                STRENGTHS
                            </p>
                            <div className="flex flex-col gap-1.5">
                                {STRENGTHS.map((s) => (
                                    <div key={s.label} className="flex items-center gap-2 text-[11px] text-white/55">
                                        <span className={`size-1 rounded-full flex-shrink-0 ${s.color}`} />
                                        {s.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* AI rewrite */}
                    <div className="bg-[#00C896]/[0.06] border border-[#00C896]/15 rounded-xl p-4">
                        <p className="text-[10px] font-medium text-[#00C896] tracking-widest mb-2">
                            AI REWRITTEN SUMMARY
                        </p>
                        <p className="text-[11px] text-white/50 leading-relaxed mb-3">
                            <span className="text-white/80 font-medium">Results-driven software engineer</span> with
                            3+ years building scalable web apps using{" "}
                            <span className="text-white/80 font-medium">React.js, TypeScript</span> and REST APIs.
                            Delivered 4 production features in Agile sprints, reducing load time by 40%...
                        </p>
                        <div className="flex items-center justify-between bg-[#00C896]/10 rounded-lg px-4 py-2.5">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.6, ease: "easeOut" }}
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

            {/* Stats */}
            <motion.div
                {...fade(0.7)}
                className="flex items-center mt-6 bg-[#111816] border border-white/7 rounded-xl overflow-hidden"
            >
                {STATS.map((s, i) => (
                    <div
                        key={s.value}
                        className={`flex-1 py-4 text-center ${i < STATS.length - 1 ? "border-r border-white/7" : ""}`}
                    >
                        <span className="block text-lg font-bold text-white">{s.value}</span>
                        <span className="block text-[10px] text-white/30 mt-0.5">{s.label}</span>
                    </div>
                ))}
            </motion.div>

        </div>
    );
}