"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WaitlistModalProps {
    plan: "pro" | "gold";
    onClose: () => void;
}

export default function WaitlistModal({ plan, onClose }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");

    const planColor = plan === "pro" ? "#00C896" : "#F59E0B";
    const planName = plan === "pro" ? "Pro" : "Gold";

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
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-sm bg-[#111816] border border-white/10 rounded-2xl p-6 z-10">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>

                {done ? (
                    <div className="text-center py-4">
                        <div
                            className="size-12 rounded-full grid place-items-center mx-auto mb-4"
                            style={{ background: `${planColor}18` }}
                        >
                            <span className="text-2xl">🎉</span>
                        </div>
                        <h3 className="text-white font-semibold text-base mb-2">
                            You&apos;re on the list!
                        </h3>
                        <p className="text-[13px] text-white/45 leading-relaxed">
                            We&apos;ll notify you when {planName} launches — with an early access discount.
                        </p>
                        <Button
                            onClick={onClose}
                            className="mt-5 w-full rounded-full text-[13px]"
                            style={{ background: planColor, color: "#0A0F0D" }}
                        >
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="mb-5">
                            <span
                                className="text-[10px] font-bold tracking-widest"
                                style={{ color: planColor }}
                            >
                                {planName.toUpperCase()} — COMING SOON
                            </span>
                            <h3 className="text-white font-semibold text-base mt-1">
                                Join the waitlist
                            </h3>
                            <p className="text-[12px] text-white/40 mt-1 leading-relaxed">
                                Be first to know when {planName} launches. Early access members get a discount.
                            </p>
                        </div>

                        {/* Input */}
                        <Input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-xl mb-3 focus:border-white/25"
                        />

                        {error && (
                            <p className="text-[12px] text-red-400 mb-3">{error}</p>
                        )}

                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full rounded-full text-[13px] font-semibold coursor-pointer"
                            style={{ background: planColor, color: "#0A0F0D" }}
                        >
                            {loading ? "Joining..." : "Join Waitlist →"}
                        </Button>

                        <p className="text-[11px] text-white/20 text-center mt-3">
                            No spam. Unsubscribe anytime.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}