interface SectionBadgeProps {
    label: string;
}

export default function SectionBadge({ label }: SectionBadgeProps) {
    return (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-[11px] font-medium tracking-wide text-primary">{label}</span>
        </div>
    );
}
