interface SectionBadgeProps {
    label: string;
}

export default function SectionBadge({ label }: SectionBadgeProps) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 mb-5">
            <span className="size-1.5 rounded-full bg-[#00C896]" />
            <span className="text-[11px] font-medium text-emerald-700 tracking-wide">{label}</span>
        </div>
    );
}
