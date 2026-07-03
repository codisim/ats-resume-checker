import Link from "next/link";

const PRODUCTS = [
    { name: "Opiik Studio", href: "https://opiik.studio" },
    { name: "Daylogs", href: "https://daylogs.codisim.com" },
    { name: "Tahar Cast", href: "https://taharcast.com" },
] as const;

const BottomFooter = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[12px] text-muted-foreground">
                    © {new Date().getFullYear()} resume.codisim — Built by{" "}
                    <Link
                        href="https://codisim.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        codisim
                    </Link>
                </p>

                <div className="flex flex-wrap items-center justify-end gap-x-2.5 gap-y-1.5">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                            Our products
                        </span>
                    </span>

                    <div className="flex items-center gap-1">
                        {PRODUCTS.map(({ name, href }) => (
                            <Link
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {name}
                                <svg
                                    width="8"
                                    height="8"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <path
                                        d="M2 8l6-6M3 2h5v5"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BottomFooter;
