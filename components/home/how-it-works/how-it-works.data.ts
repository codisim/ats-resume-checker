import { Upload, ScanLine, Sparkles } from "lucide-react";

export const STEPS = [
    {
        step: "01",
        icon: Upload,
        title: "Upload your resume",
        desc: "Drop a PDF or DOCX. We extract the text — no formatting needed.",
        color: "var(--primary)",
    },
    {
        step: "02",
        icon: ScanLine,
        title: "Paste the job description",
        desc: "Paste the JD or a job URL. We score your resume against that specific role, not a generic template.",
        color: "var(--warning)",
    },
    {
        step: "03",
        icon: Sparkles,
        title: "Get a rewritten ATS PDF",
        desc: "Download a resume tailored to that posting — keywords, summary, and bullets aimed at the ATS for that job.",
        color: "var(--primary)",
    },
];
