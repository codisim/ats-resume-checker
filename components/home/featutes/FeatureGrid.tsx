"use client";

import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { FEATURES } from "./features.data";

export default function FeatureGrid() {
    return (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {FEATURES.map((f, i) => (
                <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                >
                    <FeatureCard {...f} />
                </motion.div>
            ))}
        </div>
    );
}
