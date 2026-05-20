import {
    ScanLine,
    Sparkles,
    History,
    Globe,
    GitCompare,
    Share2,
} from "lucide-react";

export const FEATURES = [
    {
        icon: ScanLine,
        title: "ATS score instantly",
        desc: "Upload your resume and get a real ATS score in under 10 seconds. Know exactly where you stand before applying.",
        accent: "var(--primary)",
    },
    {
        icon: Sparkles,
        title: "AI rewrites your resume",
        desc: "Not just diagnosis — we hand you a fixed resume. Our AI rewrites your summary to match the job description perfectly.",
        accent: "var(--warning)",
    },
    {
        icon: GitCompare,
        title: "Job description matching",
        desc: "Paste any job description. We compare it against your resume and show you the exact skills gap killing your chances.",
        accent: "var(--primary)",
    },
    {
        icon: History,
        title: "Resume history & progress",
        desc: "Every analysis is saved. Track your ATS score improving over time — something no competitor offers.",
        accent: "var(--warning)",
    },
    {
        icon: Globe,
        title: "Built for global job seekers",
        desc: "Optimized for US, EU, Canada, Singapore and beyond. Works for any ATS system used by Fortune 500 companies.",
        accent: "var(--primary)",
    },
    {
        icon: Share2,
        title: "Refer & earn free months",
        desc: "Got hired? Share your referral link. Both you and your friend get a free Pro month — because good tools spread.",
        accent: "var(--warning)",
    },
];
