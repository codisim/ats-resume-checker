"use client";

import { motion } from "framer-motion";
import StepCard from "./StepCard";
import { STEPS } from "./how-it-works.data";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-[#0A0F0D] py-24 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#00C896]/10 border border-[#00C896]/20 rounded-full px-4 py-1.5 mb-5">
                        <span className="size-1.5 rounded-full bg-[#00C896]" />
                        <span className="text-[11px] font-medium text-[#00C896] tracking-wide">How it works</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                        From upload to{" "}
                        <span className="text-[#00C896]">hired</span>
                        {" "}in 3 steps
                    </h2>
                    <p className="text-[14px] text-white/40 max-w-sm leading-relaxed">
                        No complicated setup. No learning curve. Just results.
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
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
                    <p className="text-[12px] text-white/30">
                        Average time from upload to fixed resume —{" "}
                        <span className="text-white/60 font-medium">under 15 seconds</span>
                    </p>
                </motion.div>

            </div>
        </section>
    );
}