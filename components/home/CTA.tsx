"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const AVATARS = [
  { letter: "A", bg: "#ECFDF5", color: "#059669" },
  { letter: "J", bg: "#EEF2FF", color: "#6366F1" },
  { letter: "M", bg: "#FFFBEB", color: "#D97706" },
  { letter: "R", bg: "#ECFDF5", color: "#059669" },
  { letter: "S", bg: "#EEF2FF", color: "#6366F1" },
];

const TRUST = [
  "No credit card",
  "12 free scans/week",
  "Results in 10 seconds",
  "Cancel anytime",
];

export default function CTA() {
  return (
    <section className="bg-[#F8FAFC] py-24 px-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm lg:px-10 lg:py-20"
        >
          {/* Glow effects */}
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
            style={{ background: "rgba(0,200,150,0.06)" }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -right-16 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "rgba(123,97,255,0.04)" }}
            aria-hidden="true"
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 mb-6"
          >
            <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
            <span className="text-[11px] font-medium text-emerald-700 tracking-wide">
              370+ job seekers already started
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="mb-4 text-3xl font-bold tracking-tight leading-[1.12] text-slate-900 sm:text-4xl lg:text-5xl 2xl:text-6xl"
          >
            Your next job starts with
            <br />a <span className="text-[#00C896]">better resume</span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-[14px] text-slate-600 leading-relaxed max-w-sm mx-auto mb-8"
          >
            Free forever. No credit card. 12 analyses every week — enough to
            apply confidently and land the interview.
          </motion.p>

          {/* Avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center mb-7"
          >
            <div className="flex items-center">
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  className="size-8 rounded-full border-2 border-white grid place-items-center text-[11px] font-semibold shadow-sm"
                  style={{
                    background: av.bg,
                    color: av.color,
                    marginLeft: i === 0 ? 0 : -8,
                    zIndex: AVATARS.length - i,
                  }}
                >
                  {av.letter}
                </div>
              ))}
            </div>
            <span className="text-[12px] text-slate-500 ml-3">
              +8 others this week
            </span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center gap-3 flex-wrap mb-8"
          >
            <Link
              href="/sign-up"
              className="flex items-center gap-2 text-[14px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-7 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Check my resume — it&apos;s free
            </Link>
            <a
              href="#pricing"
              className="text-[14px] text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 px-6 py-3 rounded-full transition-all bg-white"
            >
              See pricing →
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            {TRUST.map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[12px] text-slate-500">
                <div className="size-[14px] rounded-full bg-emerald-100 grid place-items-center flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {t}
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
