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
    return (
        <div className="flex flex-col items-center text-center relative">

            {/* Connector line — hidden on last */}
            {!isLast && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+48px)] w-[calc(100%-96px)] h-px bg-gradient-to-r from-white/10 to-white/5" />
            )}

            {/* Icon circle */}
            <div
                className="relative size-20 rounded-2xl grid place-items-center mb-6 flex-shrink-0"
                style={{ background: `${color}12`, border: `1px solid ${color}25` }}
            >
                <Icon size={28} style={{ color }} strokeWidth={1.6} />
                <span
                    className="absolute -top-2.5 -right-2.5 size-6 rounded-full grid place-items-center text-[10px] font-bold"
                    style={{ background: color, color: "#0A0F0D" }}
                >
                    {step}
                </span>
            </div>

            <h3 className="text-[16px] font-semibold text-white mb-2.5">{title}</h3>
            <p className="max-w-[240px] text-[13px] leading-relaxed text-white/45 lg:max-w-[260px] lg:text-[14px]">{desc}</p>

        </div>
    );
}
