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
            className="border border-white/8 rounded-xl px-5 mb-3 last:mb-0 data-[state=open]:border-white/15 transition-colors"
        >
            <AccordionTrigger className="text-[14px] font-medium text-white/80 hover:text-white text-left py-4 hover:no-underline">
                {q}
            </AccordionTrigger>
            <AccordionContent className="text-[13px] text-white/45 leading-relaxed pb-4">
                {a}
            </AccordionContent>
        </AccordionItem>
    );
}