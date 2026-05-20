"use client";

import { motion } from "framer-motion";
import StepCard from "./StepCard";
import { STEPS } from "./how-it-works.data";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-white py-24 px-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 mb-5">
                        <span className="size-1.5 rounded-full bg-[#00C896]" />
                        <span className="text-[11px] font-medium text-emerald-700 tracking-wide">How it works</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl 2xl:text-5xl mb-3">
                        From upload to{" "}
                        <span className="text-[#00C896]">hired</span>
                        {" "}in 3 steps
                    </h2>
                    <p className="max-w-sm text-[14px] leading-relaxed text-slate-600 lg:text-[15px]">
                        No complicated setup. No learning curve. Just results.
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                        >
                            <StepCard {...step} isLast={i === STEPS.length - 1} />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    className="flex items-center justify-center gap-2 mt-14"
                >
                    <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
                    <p className="text-[12px] text-slate-500">
                        Average time from upload to fixed resume —{" "}
                        <span className="text-slate-900 font-medium">under 15 seconds</span>
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
