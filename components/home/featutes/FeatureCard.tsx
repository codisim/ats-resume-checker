import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    accent: string;
}

export default function FeatureCard({ icon: Icon, title, desc, accent }: FeatureCardProps) {
    return (
        <div className="group bg-[#111816] border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all duration-300">
            <div
                className="size-10 rounded-xl grid place-items-center mb-5"
                style={{ background: `${accent}18` }}
            >
                <Icon size={18} style={{ color: accent }} strokeWidth={1.8} />
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-2">{title}</h3>
            <p className="text-[13px] text-white/45 leading-relaxed">{desc}</p>
        </div>
    );
}