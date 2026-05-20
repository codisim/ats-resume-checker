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
                className="w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-medium text-slate-400 tracking-widest">
                            ATS ANALYSIS RESULT
                        </span>
                        <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-full px-3 py-1">
                            <span className="text-[12px] font-bold text-rose-500">38</span>
                            <span className="text-[10px] text-rose-500/70">/ 100 · Before</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "38%" }}
                                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                                className="h-full bg-rose-500 rounded-full"
                            />
                        </div>
                        <span className="text-[11px] text-slate-400">38%</span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-3">

                        <div className="rounded-xl bg-slate-50 p-3.5">
                            <p className="text-[10px] font-medium text-slate-400 tracking-widest mb-2.5">
                                MISSING SKILLS
                            </p>
                            <div className="flex flex-col gap-1.5">
                                {MISSING_SKILLS.map((s) => (
                                    <div key={s} className="flex items-center gap-2 text-[11px] text-slate-600">
                                        <span className="size-1 rounded-full bg-rose-500 flex-shrink-0" />
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3.5">
                            <p className="text-[10px] font-medium text-slate-400 tracking-widest mb-2.5">
                                STRENGTHS
                            </p>
                            <div className="flex flex-col gap-1.5">
                                {STRENGTHS.map((s) => (
                                    <div key={s.label} className="flex items-center gap-2 text-[11px] text-slate-600">
                                        <span className={`size-1 rounded-full flex-shrink-0 ${s.color}`} />
                                        {s.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* AI rewrite */}
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <p className="text-[10px] font-medium text-emerald-700 tracking-widest mb-2">
                            AI REWRITTEN SUMMARY
                        </p>
                        <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                            <span className="text-slate-900 font-medium">Results-driven software engineer</span> with
                            3+ years building scalable web apps using{" "}
                            <span className="text-slate-900 font-medium">React.js, TypeScript</span> and REST APIs.
                            Delivered 4 production features in Agile sprints, reducing load time by 40%...
                        </p>
                        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.6, ease: "easeOut" }}
                                    className="text-xl font-bold text-[#00C896]"
                                >
                                    87 / 100
                                </motion.span>
                                <p className="text-[10px] text-emerald-600 mt-0.5">ATS score after rewrite</p>
                            </div>
                            <span className="text-[11px] text-slate-400">+49 pts →</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                {...fade(0.7)}
                className="flex items-center mt-6 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
                {STATS.map((s, i) => (
                    <div
                        key={s.value}
                        className={`flex-1 py-4 text-center ${i < STATS.length - 1 ? "border-r border-slate-200" : ""}`}
                    >
                        <span className="block text-lg font-bold text-slate-900">{s.value}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">{s.label}</span>
                    </div>
                ))}
            </motion.div>

        </div>
    );
}
