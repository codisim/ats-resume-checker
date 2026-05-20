"use client";

import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <nav
      className="fixed inset-x-0 top-3 z-50 transition-all duration-300 sm:top-4"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4 rounded-full border border-border/80 bg-card/80 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-card/70 sm:px-5">
          <NavLogo />
          <NavLinks />
          <div className="flex items-center gap-2">
            <NavActions />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
