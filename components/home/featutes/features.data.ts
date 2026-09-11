import {
    ScanLine,
    Sparkles,
    History,
    FileDown,
    GitCompare,
    Link2,
} from "lucide-react";

export const FEATURES = [
    {
        icon: ScanLine,
        title: "ATS score for that job",
        desc: "Upload your resume and paste a job description. Get a match score in seconds — not a generic resume grade.",
        accent: "var(--primary)",
    },
    {
        icon: Sparkles,
        title: "Rewrite for that JD",
        desc: "We rewrite your summary and bullets using the keywords in that posting, so the ATS and the recruiter see the same role.",
        accent: "var(--warning)",
    },
    {
        icon: GitCompare,
        title: "Skill gap, not fluff",
        desc: "See matched skills, missing skills, strengths, and weaknesses against the job you are applying to.",
        accent: "var(--primary)",
    },
    {
        icon: FileDown,
        title: "Download an ATS PDF",
        desc: "Download an ATS-optimized PDF tailored to that job — ready to apply. Included on the free weekly plan.",
        accent: "var(--warning)",
    },
    {
        icon: Link2,
        title: "Paste text or a job URL",
        desc: "Paste the description, or drop a job link when we can read it. LinkedIn pages often block scrapers — then paste the text.",
        accent: "var(--primary)",
    },
    {
        icon: History,
        title: "History for each role",
        desc: "Every analysis is saved with the job title we infer from the JD, so you can compare versions as you apply.",
        accent: "var(--warning)",
    },
];
