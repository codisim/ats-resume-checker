import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    accent: string;
}

export default function FeatureCard({ icon: Icon, title, desc, accent }: FeatureCardProps) {
    const iconBackground = `color-mix(in oklab, ${accent} 14%, transparent)`;
    const iconBorder = `color-mix(in oklab, ${accent} 24%, transparent)`;

    return (
        <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
            <div
                className="mb-5 grid size-10 place-items-center rounded-xl border"
                style={{ background: iconBackground, borderColor: iconBorder }}
            >
                <Icon size={18} style={{ color: accent }} strokeWidth={1.8} />
            </div>
            <h3 className="mb-2 text-[15px] font-semibold text-foreground">{title}</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
        </div>
    );
}
