"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";
import FaqItem from "./FaqItem";
import { FAQS } from "./faq.data";

export default function FAQ() {
    return (
        <section id="faq" className="bg-background px-4 py-24">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="mx-auto mb-12 flex max-w- flex-col items-center text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5">
                        <span className="size-1.5 rounded-full bg-primary" />
                        <span className="text-[11px] font-medium tracking-wide text-primary">FAQ</span>
                    </div>
                    <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl">
                        Quick answers
                        {/* <br className="hidden sm:block" /> */}
                        <span className="text-primary"> - No long scroll.</span>
                    </h2>
                    <p className="max-w-lg text-[14px] leading-relaxed text-muted-foreground lg:text-[15px]">
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
