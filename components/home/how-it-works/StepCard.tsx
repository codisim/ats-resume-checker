import { LucideIcon } from "lucide-react";

interface StepCardProps {
    step: string;
    icon: LucideIcon;
    title: string;
    desc: string;
    color: string;
    isLast?: boolean;
}

export default function StepCard({ step, icon: Icon, title, desc, color, isLast }: StepCardProps) {
    const ringBackground = `color-mix(in oklab, ${color} 12%, transparent)`;
    const ringBorder = `color-mix(in oklab, ${color} 24%, transparent)`;

    return (
        <div className="flex flex-col items-center text-center relative">

            {/* Connector line — hidden on last */}
            {!isLast && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+48px)] w-[calc(100%-96px)] h-px bg-gradient-to-r from-slate-200 to-slate-100" />
            )}

            {/* Icon circle */}
            <div
                className="relative mb-6 grid size-20 flex-shrink-0 place-items-center rounded-2xl border"
                style={{ background: ringBackground, borderColor: ringBorder }}
            >
                <Icon size={28} style={{ color }} strokeWidth={1.6} />
                <span
                    className="absolute -right-2.5 -top-2.5 grid size-6 place-items-center rounded-full text-[10px] font-bold"
                    style={{ background: color, color: "var(--primary-foreground)" }}
                >
                    {step}
                </span>
            </div>

            <h3 className="mb-2.5 text-[16px] font-semibold text-foreground">{title}</h3>
            <p className="max-w-[240px] text-[13px] leading-relaxed text-muted-foreground lg:max-w-[260px] lg:text-[14px]">{desc}</p>

        </div>
    );
}
