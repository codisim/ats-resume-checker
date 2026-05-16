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

    return (
        <>
            <div
                className={cn(
                    "relative flex flex-col gap-5 bg-[#111816] rounded-2xl p-6 h-full",
                    featured ? "border-[1.5px] border-[#00C896]" : "border border-white/9",
                    comingSoon && "opacity-90"
                )}
            >
                {/* Most popular badge */}
                {featured && !comingSoon && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00C896] text-[#0A0F0D] text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
                        MOST POPULAR
                    </span>
                )}

                {/* Coming soon badge */}
                {comingSoon && (
                    <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full tracking-wider border"
                        style={{
                            background: `${color}18`,
                            color,
                            borderColor: `${color}35`,
                        }}
                    >
                        COMING SOON
                    </span>
                )}

                {/* Header */}
                <div>
                    <p className="text-[11px] font-semibold tracking-widest mb-2" style={{ color }}>
                        {name}
                    </p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-[32px] font-bold text-white">{price}</span>
                        <span className="text-[12px] text-white/30">{period}</span>
                    </div>
                    <p className="text-[11px] text-white/30 mt-1">{note}</p>
                    <p className="text-[12px] text-white/45 leading-relaxed mt-2">{desc}</p>
                </div>

                <div className="h-px bg-white/7" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5">
                    {features.map((f) => (
                        <li
                            key={f.label}
                            className={cn(
                                "flex items-center gap-2 text-[12px]",
                                f.included ? "text-white/60" : "text-white/25"
                            )}
                        >
                            <span
                                className={cn(
                                    "size-[13px] rounded-full grid place-items-center flex-shrink-0",
                                    f.included ? "bg-[#00C896]/15" : "bg-white/6"
                                )}
                            >
                                {f.included
                                    ? <Check size={8} className="text-[#00C896]" strokeWidth={3} />
                                    : <X size={8} className="text-white/20" strokeWidth={3} />
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
                            className="block w-full text-center py-2.5 rounded-full text-[13px] font-semibold transition-all border"
                            style={{
                                background: `${color}12`,
                                color,
                                borderColor: `${color}30`,
                            }}
                        >
                            {btnLabel}
                        </button>
                    ) : (
                        <Link
                            href="/sign-up"
                            className={cn(
                                "block w-full text-center py-2.5 rounded-full text-[13px] font-semibold transition-all",
                                id === "free" && "bg-white/8 text-white/55 hover:bg-white/12",
                            )}
                        >
                            {btnLabel}
                        </Link>
                    )}
                    <p className="text-[10px] text-white/22 text-center mt-2">{btnNote}</p>
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