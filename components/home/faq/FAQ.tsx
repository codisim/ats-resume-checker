"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import FaqItem from "./FaqItem";
import { FAQS } from "./faq.data";

export default function FAQ() {
    return (
        <section id="faq" className="bg-[#0A0F0D] py-24 px-4">
            <div className="container mx-auto px-0 sm:px-2 lg:px-4 2xl:px-6">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-[#00C896]/10 border border-[#00C896]/20 rounded-full px-4 py-1.5 mb-5">
                        <span className="size-1.5 rounded-full bg-[#00C896]" />
                        <span className="text-[11px] font-medium text-[#00C896] tracking-wide">FAQ</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl 2xl:text-5xl mb-3">
                        Questions? <span className="text-[#00C896]">Answered.</span>
                    </h2>
                    <p className="max-w-xl text-[14px] leading-relaxed text-white/40 lg:text-[15px]">
                        Everything you need to know before you start.
                    </p>
                </div>

                {/* Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {FAQS.map((faq, i) => (
                            <FaqItem
                                key={i}
                                value={`faq-${i}`}
                                q={faq.q}
                                a={faq.a}
                            />
                        ))}
                    </Accordion>
                </motion.div>

            </div>
        </section>
    );
}
