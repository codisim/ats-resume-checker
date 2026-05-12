"use client";

import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { FEATURES } from "./features.data";

export default function FeatureGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
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