"use client"


import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./WorldMap"), { ssr: false });

export default function GlobalMap() {
    return (
        <section id="map" className="bg-card px-4 py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5">
                        <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                        <span className="text-[11px] font-medium tracking-wide text-primary">
                            Live — updating in real time
                        </span>
                    </div>
                    <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl">
                        Used in <span className="text-primary">20+ countries</span>
                    </h2>
                    <p className="max-w-sm text-[14px] text-muted-foreground lg:text-[15px]">
                        Real job seekers from around the world — and growing every day.
                    </p>    
                </div>

                <WorldMap />

            </div>
        </section>
    );
}
