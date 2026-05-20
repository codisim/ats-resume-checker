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
            className="rounded-xl border border-slate-200 bg-white px-5 transition-colors data-[state=open]:border-slate-300 data-[state=open]:bg-slate-50"
        >
            <AccordionTrigger className="py-4 text-left text-[14px] font-medium text-slate-900 no-underline hover:no-underline data-[state=open]:text-slate-900">
                {q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[13px] leading-relaxed text-slate-600">
                {a}
            </AccordionContent>
        </AccordionItem>
    );
}
