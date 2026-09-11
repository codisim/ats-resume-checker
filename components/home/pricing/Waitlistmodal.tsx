"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAID_PLAN_LABELS, type PaidPlanId } from "./pricing.data";

interface WaitlistModalProps {
    plan: PaidPlanId;
    onClose: () => void;
}

export default function WaitlistModal({ plan, onClose }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");

    const planColor = plan === "year" ? "var(--warning)" : "var(--primary)";
    const planTint = `color-mix(in oklab, ${planColor} 14%, transparent)`;
    const planName = PAID_PLAN_LABELS[plan];

    async function handleSubmit() {
        if (!email || !email.includes("@")) {
            setError("Enter a valid email.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, interest: plan }),
            });

            if (!res.ok) throw new Error("Failed");
            setDone(true);
        } catch {
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl shadow-slate-900/10">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
                >
                    <X size={16} />
                </button>

                {done ? (
                    <div className="text-center py-4">
                        <div
                            className="size-12 rounded-full grid place-items-center mx-auto mb-4"
                            style={{ background: planTint }}
                        >
                            <span className="text-2xl">🎉</span>
                        </div>
                        <h3 className="mb-2 text-base font-semibold text-foreground">
                            You&apos;re on the list!
                        </h3>
                        <p className="text-[13px] leading-relaxed text-muted-foreground">
                            We&apos;ll email you when the {planName} plan is ready to pay
                            — Whop on the web, Play Billing in the Android app.
                        </p>
                        <Button
                            onClick={onClose}
                            className="mt-5 w-full rounded-full text-[13px]"
                            style={{ background: planColor, color: "var(--primary-foreground)" }}
                        >
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="mb-5">
                            <span
                                className="text-[10px] font-bold tracking-widest"
                                style={{ color: planColor }}
                            >
                                {planName.toUpperCase()} — COMING SOON
                            </span>
                            <h3 className="mt-1 text-base font-semibold text-foreground">
                                Join the waitlist
                            </h3>
                            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                                Get notified when you can pay for {planName}. Same ATS
                                score + JD rewrite on web and mobile.
                            </p>
                        </div>

                        <Input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            className="mb-3 rounded-xl border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary/30"
                        />

                        {error && (
                            <p className="mb-3 text-[12px] text-danger">{error}</p>
                        )}

                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full rounded-full text-[13px] font-semibold cursor-pointer"
                            style={{ background: planColor, color: "var(--primary-foreground)" }}
                        >
                            {loading ? "Joining..." : "Join Waitlist →"}
                        </Button>

                        <p className="mt-3 text-center text-[11px] text-muted-foreground">
                            No spam. Unsubscribe anytime.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
