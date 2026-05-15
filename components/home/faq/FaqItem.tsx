import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItemProps {
    q: string;
    a: string;
    value: string;
}

export default function FaqItem({ q, a, value }: FaqItemProps) {
    return (
        <AccordionItem
            value={value}
            className="rounded-xl border border-white/8 bg-white/[0.02] px-5 transition-colors data-[state=open]:border-white/15 data-[state=open]:bg-white/[0.03]"
        >
            <AccordionTrigger className="py-4 text-left text-[14px] font-medium text-white/85 no-underline hover:no-underline data-[state=open]:text-white">
                {q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[13px] leading-relaxed text-white/45">
                {a}
            </AccordionContent>
        </AccordionItem>
    );
}
