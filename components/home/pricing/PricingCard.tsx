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
                    "relative flex flex-col gap-5 rounded-2xl border bg-white p-6 h-full shadow-sm",
                    featured ? "border-emerald-300" : "border-slate-200",
                    comingSoon && "opacity-90"
                )}
            >
                {/* Most popular badge */}
                {featured && !comingSoon && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
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
                        <span className="text-[32px] font-bold text-slate-900">{price}</span>
                        <span className="text-[12px] text-slate-400">{period}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{note}</p>
                    <p className="text-[12px] text-slate-600 leading-relaxed mt-2">{desc}</p>
                </div>

                <div className="h-px bg-slate-200" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5">
                    {features.map((f) => (
                        <li
                            key={f.label}
                            className={cn(
                                "flex items-center gap-2 text-[12px]",
                                f.included ? "text-slate-700" : "text-slate-400"
                            )}
                        >
                            <span
                                className={cn(
                                    "size-[13px] rounded-full grid place-items-center flex-shrink-0",
                                    f.included ? "bg-emerald-100" : "bg-slate-100"
                                )}
                            >
                                {f.included
                                    ? <Check size={8} className="text-emerald-600" strokeWidth={3} />
                                    : <X size={8} className="text-slate-400" strokeWidth={3} />
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
                            className="block w-full text-center py-2.5 rounded-full text-[13px] font-semibold transition-all border cursor-pointer"
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
                                "block w-full text-center py-2.5 rounded-full text-[13px] font-semibold transition-all bg-slate-900 text-white hover:bg-slate-800",
                                id === "free" && "bg-slate-100 text-slate-900 hover:bg-slate-200",
                            )}
                        >
                            {btnLabel}
                        </Link>
                    )}
                    <p className="text-[10px] text-slate-400 text-center mt-2">{btnNote}</p>
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
