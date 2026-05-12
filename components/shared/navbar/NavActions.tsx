"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default function NavActions() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />;
    }

    if (isSignedIn) {
        return (
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full transition-all duration-150"
                >
                    {user.imageUrl ? (
                        <Image
                            src={user.imageUrl}
                            alt={user.firstName ?? "User"}
                            width={26}
                            height={26}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-6 h-6 rounded-full bg-[#00C896] flex items-center justify-center text-[#0A0F0D] text-xs font-bold">
                            {user.firstName?.[0] ?? "U"}
                        </div>
                    )}
                    <span className="text-sm text-white/80 max-w-[100px] truncate">
                        {user.firstName ?? user.emailAddresses[0]?.emailAddress}
                    </span>
                </Link>

                <SignOutButton>
                    <button className="text-sm text-white/40 hover:text-white/70 transition-colors duration-150 px-2 py-1.5">
                        Sign out
                    </button>
                </SignOutButton>
            </div>
        );
    }

    return (
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link
                href="/sign-in"
                className="text-sm text-white/50 hover:text-white transition-colors px-3 py-2"
            >
                Sign in
            </Link>
            <Link
                href="/sign-up"
                className="flex items-center gap-1.5 text-sm font-medium text-[#0A0F0D] bg-[#00C896] hover:bg-[#00A87E] px-5 py-2.5 rounded-full transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00C896]/20"
            >
                Get Started
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
        </div>
    );
}