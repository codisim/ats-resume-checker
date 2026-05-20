"use client"


import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./WorldMap"), { ssr: false });

export default function GlobalMap() {
    return (
        <section id="map" className="bg-white py-24 px-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 mb-5">
                        <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
                        <span className="text-[11px] font-medium text-emerald-700 tracking-wide">
                            Live — updating in real time
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl 2xl:text-5xl mb-3">
                        Used in <span className="text-[#00C896]">10+ countries</span>
                    </h2>
                    <p className="max-w-sm text-[14px] text-slate-600 lg:text-[15px]">
                        Real job seekers from around the world — and growing every day.
                    </p>
                </div>

                <WorldMap />

            </div>
        </section>
    );
}
