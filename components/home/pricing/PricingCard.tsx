"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import WaitlistModal from "./Waitlistmodal";

interface Feature {
    label: string;
    included: boolean;
}

interface PricingCardProps {
    id: string;
    name: string;
    price: string;
    period: string;
    note: string;
    desc: string;
    featured: boolean;
    comingSoon: boolean;
    btnLabel: string;
    btnNote: string;
    color: string;
    features: Feature[];
}

export default function PricingCard(props: PricingCardProps) {
    const { id, name, price, period, note, desc, featured, comingSoon, btnLabel, btnNote, color, features } = props;
    const [showModal, setShowModal] = useState(false);
    const colorTint = `color-mix(in oklab, ${color} 12%, transparent)`;
    const colorTintStrong = `color-mix(in oklab, ${color} 24%, transparent)`;

    return (
        <>
            <div
                className={cn(
                    "relative flex h-full flex-col gap-5 rounded-2xl border bg-card p-6 shadow-sm",
                    featured ? "border-primary/30" : "border-border",
                    comingSoon && "opacity-90"
                )}
            >
                {/* Most popular badge */}
                {featured && !comingSoon && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-wider text-primary-foreground">
                        MOST POPULAR
                    </span>
                )}

                {/* Coming soon badge */}
                {comingSoon && (
                    <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider"
                        style={{
                            background: colorTint,
                            color,
                            borderColor: colorTintStrong,
                        }}
                    >
                        COMING SOON
                    </span>
                )}

                {/* Header */}
                <div>
                    <p className="mb-2 text-[11px] font-semibold tracking-widest" style={{ color }}>
                        {name}
                    </p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-[32px] font-bold text-foreground">{price}</span>
                        <span className="text-[12px] text-muted-foreground">{period}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{note}</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{desc}</p>
                </div>

                <div className="h-px bg-border" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5">
                    {features.map((f) => (
                        <li
                            key={f.label}
                            className={cn(
                                "flex items-center gap-2 text-[12px]",
                                f.included ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            <span
                                className={cn(
                                    "size-[13px] rounded-full grid place-items-center flex-shrink-0",
                                    f.included ? "bg-success/15" : "bg-muted"
                                )}
                            >
                                {f.included
                                    ? <Check size={8} className="text-success" strokeWidth={3} />
                                    : <X size={8} className="text-muted-foreground" strokeWidth={3} />
                                }
                            </span>
                            {f.label}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                    {comingSoon ? (
                        <button
                            onClick={() => setShowModal(true)}
                            className="block w-full cursor-pointer rounded-full border py-2.5 text-center text-[13px] font-semibold transition-all"
                            style={{
                                background: colorTint,
                                color,
                                borderColor: colorTintStrong,
                            }}
                        >
                            {btnLabel}
                        </button>
                    ) : (
                        <Link
                            href="/sign-up"
                            className={cn(
                                "block w-full rounded-full bg-primary px-0 py-2.5 text-center text-[13px] font-semibold text-primary-foreground transition-all hover:brightness-95",
                                id === "free" && "bg-secondary text-foreground hover:bg-secondary/80",
                            )}
                        >
                            {btnLabel}
                        </Link>
                    )}
                    <p className="mt-2 text-center text-[10px] text-muted-foreground">{btnNote}</p>
                </div>
            </div>

            {/* Waitlist Modal */}
            {showModal && (
                <WaitlistModal
                    plan={id as "pro" | "gold"}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}
