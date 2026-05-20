import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin } from "lucide-react";
import BottomFooter from "./BottomFooter";

const LINKS = {
    Product: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Live users", href: "#map" },
    ],
    Resources: [
        { label: "Blog", href: "/blog" },
        { label: "ATS guide", href: "/blog/ats-guide" },
        { label: "Resume tips", href: "/blog/resume-tips" },
        { label: "Changelog", href: "/changelog" },
    ],
    Legal: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms of service", href: "/terms" },
        { label: "Cookie policy", href: "/cookies" },
    ],
};

const SOCIALS = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="bg-[#0A0F0D] border-t border-white/8">
            <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-12">

                {/* Top row */}
                <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-5">

                    {/* Brand col */}
                    <div className="col-span-2 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="size-8 rounded-lg bg-gradient-to-br from-[#00C896] to-[#7B61FF] grid place-items-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 5h10M3 8h6M3 11h8" stroke="#0A0F0D" strokeWidth="1.8" strokeLinecap="round" />
                                    <circle cx="13" cy="11" r="3" fill="#0A0F0D" />
                                    <path d="M12 11l.8.8 1.5-1.5" stroke="#00C896" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="font-semibold text-[15px] text-white tracking-tight">
                                resume<span className="text-[#00C896]">.</span>codisim
                            </span>
                        </Link>

                        <p className="mb-5 max-w-[220px] text-[13px] leading-relaxed text-white/40">
                            AI-powered resume analyzer that helps you pass ATS and land more interviews — globally.
                        </p>

                        {/* Socials */}
                        <div className="flex items-center gap-2">
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="size-8 rounded-lg border border-white/10 grid place-items-center text-white/40 hover:text-white hover:border-white/25 transition-colors"
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link cols */}
                    {Object.entries(LINKS).map(([group, items]) => (
                        <div key={group}>
                            <p className="text-[11px] font-medium text-white/30 tracking-widest uppercase mb-4">
                                {group}
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                {items.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="text-[13px] text-white/50 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="bg-white/8 mb-6" />

                {/* Bottom row */}
                <BottomFooter />

            </div>
        </footer>
    );
}
