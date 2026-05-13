import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./WorldMap"), { ssr: false });

export default function GlobalMap() {
    return (
        <section id="map" className="bg-[#0A0F0D] py-24 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-[#00C896]/10 border border-[#00C896]/20 rounded-full px-4 py-1.5 mb-5">
                        <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
                        <span className="text-[11px] font-medium text-[#00C896] tracking-wide">
                            Live — updating in real time
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                        Used in <span className="text-[#00C896]">10+ countries</span>
                    </h2>
                    <p className="text-[14px] text-white/40 max-w-sm">
                        Real job seekers from around the world — and growing every day.
                    </p>
                </div>

                <WorldMap />

            </div>
        </section>
    );
}