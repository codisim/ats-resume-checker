"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const AVATARS = [
  { letter: "A", bg: "var(--success)", color: "var(--success)" },
  { letter: "J", bg: "var(--primary)", color: "var(--primary)" },
  { letter: "M", bg: "var(--warning)", color: "var(--warning)" },
  { letter: "R", bg: "var(--success)", color: "var(--success)" },
  { letter: "S", bg: "var(--primary)", color: "var(--primary)" },
];

const TRUST = [
  "No credit card",
  "7 free scans/week",
  "Results in 10 seconds",
  "Cancel anytime",
];

export default function CTA() {
  return (
    <section className="bg-background px-4 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm lg:px-10 lg:py-20"
        >
          {/* Glow effects */}
          <div
            className="pointer-events-none absolute -top-16 left-1/2 h-[200px] w-[400px] -translate-x-1/2 rounded-full"
            style={{ background: "color-mix(in oklab, var(--primary) 10%, transparent)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-16 h-[300px] w-[300px] rounded-full"
            style={{ background: "color-mix(in oklab, var(--warning) 8%, transparent)" }}
            aria-hidden="true"
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[11px] font-medium tracking-wide text-primary">
              60+ job seekers already started
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="mb-4 text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl 2xl:text-6xl"
          >
            Your next job starts with
            <br />a <span className="text-primary">better resume</span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mb-8 max-w-sm text-[14px] leading-relaxed text-muted-foreground"
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
                  className="grid size-8 place-items-center rounded-full border-2 border-card text-[11px] font-semibold shadow-sm"
                  style={{
                    background: `color-mix(in oklab, ${av.bg} 14%, transparent)`,
                    color: av.color,
                    marginLeft: i === 0 ? 0 : -8,
                    zIndex: AVATARS.length - i,
                  }}
                >
                  {av.letter}
                </div>
              ))}
            </div>
            <span className="ml-3 text-[12px] text-muted-foreground">
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
              className="flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Check my resume — it&apos;s free
            </Link>
            <a
              href="#pricing"
              className="rounded-full border border-border bg-background px-6 py-3 text-[14px] text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
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
              <div key={i} className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                <div className="grid size-[14px] flex-shrink-0 place-items-center rounded-full bg-success/15">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
