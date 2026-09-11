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
                        <span className="text-primary">you are applying.</span>
                    </h2>
                    <p className="max-w-xl text-[14px] leading-relaxed text-muted-foreground lg:text-[15px]">
                        7 free scans a week. Then $2.99 for 7 days, $7.99 a month, or $19.99 a year.
                        Website checkout is Whop. Play Store uses Play Billing. Same plan on both.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-5">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                        >
                            <PricingCard {...plan} />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <p className="mt-10 text-center text-[12px] text-muted-foreground">
                    Paid plans are fair-use unlimited{" "}
                    <span className="text-foreground">(up to 50 analyses per week)</span>
                    {" "}so one cheap week cannot drain AI costs. No LinkedIn optimizer, cover letters, or GitHub review.
                </p>

            </div>
        </section>
    );
}
