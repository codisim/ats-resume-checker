"use client";

import { useState, useEffect } from "react";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? "bg-[#0A0F0D]/85 backdrop-blur-xl border-b border-white/10 py-3"
                        : "py-5"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8">

                    <NavLogo />
                    <NavLinks />
                    <NavActions />

                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden ml-auto flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer z-50"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-200 origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-200 origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                    </button>

                </div>
            </nav>

            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}