"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import FaqItem from "./FaqItem";
import { FAQS } from "./faq.data";

export default function FAQ() {
    return (
        <section id="faq" className="bg-[#0A0F0D] py-24 px-4">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="mx-auto mb-12 flex max-w- flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 bg-[#00C896]/10 border border-[#00C896]/20 rounded-full px-4 py-1.5 mb-5">
                        <span className="size-1.5 rounded-full bg-[#00C896]" />
                        <span className="text-[11px] font-medium text-[#00C896] tracking-wide">FAQ</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl 2xl:text-5xl mb-3">
                        Quick answers
                        {/* <br className="hidden sm:block" /> */}
                        <span className="text-[#00C896]"> - No long scroll.</span>
                    </h2>
                    <p className="max-w-lg text-[14px] leading-relaxed text-white/40 lg:text-[15px]">
                        Short answers to the questions people usually ask before trying it.
                    </p>
                </div>

                {/* Compact cards */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <Accordion
                        type="single"
                        collapsible
                        className="mx-auto grid max-w-3xl grid-cols-1 gap-3"
                    >
                        {FAQS.map((faq, i) => (
                            <FaqItem
                                key={faq.q}
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
