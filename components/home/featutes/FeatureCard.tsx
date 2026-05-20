import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    accent: string;
}

export default function FeatureCard({ icon: Icon, title, desc, accent }: FeatureCardProps) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
            <div
                className="size-10 rounded-xl grid place-items-center mb-5"
                style={{ background: `${accent}18` }}
            >
                <Icon size={18} style={{ color: accent }} strokeWidth={1.8} />
            </div>
            <h3 className="text-[15px] font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-[13px] text-slate-600 leading-relaxed">{desc}</p>
        </div>
    );
}
