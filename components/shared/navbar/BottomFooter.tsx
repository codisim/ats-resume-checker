const BottomFooter = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[12px] text-white/25">
                    © {new Date().getFullYear()} resume.codisim — Built by{" "}
                    <a
                        href="https://codisim.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00C896]/70 hover:text-[#00C896] transition-colors"
                    >
                        codisim
                    </a>
                </p>

                <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
                    <span className="text-[12px] text-white/25">
                        All systems operational
                    </span>
                </div>
            </div>
        </>
    );
};

export default BottomFooter;