"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Live users 🌍", href: "#map" },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
    const { isSignedIn, user } = useUser();

    return (
        <div
            className={`fixed inset-0 z-40 bg-[#0A0F0D] flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
        >
            <ul className="flex flex-col items-center gap-6 list-none m-0 p-0">
                {links.map((item) => (
                    <li key={item.href}>
                        <a
                            href={item.href}
                            onClick={onClose}
                            className="text-3xl font-bold text-white hover:text-[#00C896] transition-colors duration-150"
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="flex flex-col items-center gap-3 mt-4">
                {isSignedIn ? (
                    <>
                        <p className="text-white/60 text-sm">
                            Hey, {user?.firstName ?? "there"} 👋
                        </p>
                        <Link
                            href="/dashboard"
                            onClick={onClose}
                            className="text-base font-medium text-[#0A0F0D] bg-[#00C896] px-8 py-3 rounded-full"
                        >
                            Dashboard →
                        </Link>
                        <SignOutButton>
                            <button className="text-sm text-white/40 mt-1">Sign out</button>
                        </SignOutButton>
                    </>
                ) : (
                    <>
                        <Link
                            href="/sign-in"
                            onClick={onClose}
                            className="text-base text-white/50"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/sign-up"
                            onClick={onClose}
                            className="text-base font-medium text-[#0A0F0D] bg-[#00C896] px-8 py-3 rounded-full"
                        >
                            Get Started →
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}