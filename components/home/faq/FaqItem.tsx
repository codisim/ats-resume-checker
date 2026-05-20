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
            className="rounded-xl border border-border bg-card px-5 transition-colors data-[state=open]:border-primary/30 data-[state=open]:bg-secondary"
        >
            <AccordionTrigger className="py-4 text-left text-[14px] font-medium text-foreground no-underline hover:no-underline data-[state=open]:text-foreground">
                {q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[13px] leading-relaxed text-muted-foreground">
                {a}
            </AccordionContent>
        </AccordionItem>
    );
}
