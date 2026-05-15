"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const AVATARS = [
  { letter: "A", bg: "#1A2420", color: "#00C896" },
  { letter: "J", bg: "#1A1A2E", color: "#7B61FF" },
  { letter: "M", bg: "#1E1A12", color: "#F59E0B" },
  { letter: "R", bg: "#1A2420", color: "#00C896" },
  { letter: "S", bg: "#1A1A2E", color: "#7B61FF" },
];

const TRUST = [
  "No credit card",
  "12 free scans/week",
  "Results in 10 seconds",
  "Cancel anytime",
];

export default function CTA() {
  return (
    <section className="bg-[#0A0F0D] py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-[#111816] border border-white/9 rounded-3xl px-6 py-16 text-center overflow-hidden"
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
            className="inline-flex items-center gap-2 bg-[#00C896]/10 border border-[#00C896]/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
            <span className="text-[11px] font-medium text-[#00C896] tracking-wide">
              370+ job seekers already started
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-4"
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
            className="text-[14px] text-white/40 leading-relaxed max-w-sm mx-auto mb-8"
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
                  className="size-8 rounded-full border-2 border-[#111816] grid place-items-center text-[11px] font-semibold"
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
            <span className="text-[12px] text-white/35 ml-3">
              +365 others this week
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
              className="flex items-center gap-2 text-[14px] font-semibold text-[#0A0F0D] bg-[#00C896] hover:bg-[#00A87E] px-7 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00C896]/20"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="#0A0F0D" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Check my resume — it&apos;s free
            </Link>
            <a
              href="#pricing"
              className="text-[14px] text-white/45 hover:text-white border border-white/12 hover:border-white/25 px-6 py-3 rounded-full transition-all"
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
              <div key={i} className="flex items-center gap-1.5 text-[12px] text-white/30">
                <div className="size-[14px] rounded-full bg-[#00C896]/12 grid place-items-center flex-shrink-0">
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
