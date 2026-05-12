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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
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
