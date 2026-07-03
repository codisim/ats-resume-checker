import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LINKS, SOCIALS } from "./FooterLink";
import BottomFooter from "./BottomFooter";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-12">

                {/* Top row */}
                <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-5">

                    {/* Brand col */}
                    <div className="col-span-2 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="size-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-400 grid place-items-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 5h10M3 8h6M3 11h8" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                                    <circle cx="13" cy="11" r="3" fill="#ffffff" />
                                    <path d="M12 11l.8.8 1.5-1.5" stroke="#0f766e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="font-semibold text-[15px] text-foreground tracking-tight">
                                resume<span className="text-emerald-600">.</span>codisim
                            </span>
                        </Link>

                        <p className="mb-5 max-w-[220px] text-[13px] leading-relaxed text-muted-foreground">
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
                                    className="size-8 rounded-lg border border-border grid place-items-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link cols */}
                    {Object.entries(LINKS).map(([group, items]) => (
                        <div key={group}>
                            <p className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase mb-4">
                                {group}
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                {items.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="bg-border mb-6" />

                {/* Bottom row */}
                <BottomFooter />

            </div>
        </footer>
    );
}
