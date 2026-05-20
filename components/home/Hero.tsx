"use client";

import { useEffect, useRef } from "react";
import HeroContent from "./HeroContent";
import HeroAnalysis from "./HeroAnalysis";

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const stars = Array.from({ length: 160 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.2,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.004 + 0.002,
        }));

        let t = 0;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            t += 0.012;
            for (const s of stars) {
                const alpha = 0.2 + 0.6 * Math.abs(Math.sin(t * s.speed * 60 + s.phase));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(148,163,184,${alpha * 0.85})`;
                ctx.fill();
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#F8FAFC] px-4 py-28 lg:py-32">

            {/* Star background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
            />

            {/* Teal glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(16,185,129,0.06) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            <div className="container relative z-10 mx-auto grid items-center gap- lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:gap-10 2xl:gap-16">
                <HeroContent />
                <HeroAnalysis />
            </div>

        </section>
    );
}
