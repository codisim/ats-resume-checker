interface SectionBadgeProps {
    label: string;
}

export default function SectionBadge({ label }: SectionBadgeProps) {
    return (
        <div className="inline-flex items-center gap-2 bg-[#00C896]/10 border border-[#00C896]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="size-1.5 rounded-full bg-[#00C896]" />
            <span className="text-[11px] font-medium text-[#00C896] tracking-wide">{label}</span>
        </div>
    );
}