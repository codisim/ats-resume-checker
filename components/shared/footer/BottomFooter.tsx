import Link from "next/link";

const BottomFooter = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[12px] text-slate-500">
                    © {new Date().getFullYear()} resume.codisim — Built by{" "}
                    <Link
                        href="https://codisim.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                        codisim
                    </Link>
                </p>

                <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
                    <span className="text-[12px] text-slate-500">
                        Our others products:
                    </span>

                    {/* <span className="text-[12px] text-slate-500">
                        All systems operational
                    </span> */}
                    <Link
                        href="https://opiik.studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                        Opiik Studio
                    </Link>
                    <Link
                        href="https://daylogs.codisim.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                        Daylogs
                    </Link>
                    
                    
                </div>
            </div>
        </>
    );
};

export default BottomFooter;
