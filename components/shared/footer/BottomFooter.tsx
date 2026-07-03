import Link from "next/link";

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

                <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[12px] text-muted-foreground">
                        Our others products:
                    </span>

                    {/* <span className="text-[12px] text-slate-500">
                        All systems operational
                    </span> */}
                    <Link
                        href="https://opiik.studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        Opiik Studio
                    </Link>
                    <Link
                        href="https://daylogs.codisim.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        Daylogs
                    </Link>

                     <Link
                        href="https://taharcast.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        Tahar Cast
                    </Link>
                    
                    
                </div>
            </div>
        </>
    );
};

export default BottomFooter;
