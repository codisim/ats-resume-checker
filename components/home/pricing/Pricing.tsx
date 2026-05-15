"use client";

import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
import { PLANS } from "./pricing.data";

export default function Pricing() {
    return (
        <section id="pricing" className="bg-[#0A0F0D] py-24 px-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-[#00C896]/10 border border-[#00C896]/20 rounded-full px-4 py-1.5 mb-5">
                        <span className="size-1.5 rounded-full bg-[#00C896]" />
                        <span className="text-[11px] font-medium text-[#00C896] tracking-wide">
                            Simple pricing
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl 2xl:text-5xl mb-3">
                        Start free. Upgrade when{" "}
                        <span className="text-[#00C896]">ready.</span>
                    </h2>
                    <p className="max-w-xl text-[14px] leading-relaxed text-white/40 lg:text-[15px]">
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
                <p className="text-center text-[12px] text-white/25 mt-10">
                    All plans include a{" "}
                    <span className="text-white/45">referral program</span>
                    {" "}— share your link, get 1 free month when your friend joins.
                </p>

            </div>
        </section>
    );
}
