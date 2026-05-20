"use client";

import { useEffect, useState } from "react";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-3 inset-x-0 z-50 px-4 transition-all duration-300 sm:top-4 sm:px-6 lg:px-8 ${
        scrolled
          ? "py-0"
          : "py-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/45 bg-white/60 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/45 dark:border-white/10 dark:bg-slate-950/35 sm:px-5">
        <NavLogo />
        <NavLinks />
        <div className="flex items-center gap-2">
          <NavActions />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
