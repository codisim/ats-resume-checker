"use client";

import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
import { PLANS } from "./pricing.data";

export default function Pricing() {
    return (
        <section id="pricing" className="bg-card px-4 py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-14">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5">
                        <span className="size-1.5 rounded-full bg-primary" />
                        <span className="text-[11px] font-medium tracking-wide text-primary">
                            Simple pricing
                        </span>
                    </div>
                    <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl">
                        Start free. Upgrade when{" "}
                        <span className="text-primary">ready.</span>
                    </h2>
                    <p className="max-w-xl text-[14px] leading-relaxed text-muted-foreground lg:text-[15px]">
                        No hidden fees. No credit card needed to start.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                        >
                            <PricingCard {...plan} />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <p className="mt-10 text-center text-[12px] text-muted-foreground">
                    All plans include a{" "}
                    <span className="text-foreground">referral program</span>
                    {" "}— share your link, get 1 free month when your friend joins.
                </p>

            </div>
        </section>
    );
}
