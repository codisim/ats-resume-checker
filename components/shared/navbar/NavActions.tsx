"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavActions() {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return <div className="hidden md:block size-[34px] animate-pulse rounded-full bg-white/40 dark:bg-white/10" />;
    }

    if (isSignedIn) {
        return (
            <div className="hidden items-center gap-2 md:flex">
                <ThemeSwitcher />
                {/* <UserMenu /> */}
                <Button
                    size="sm"
                    asChild
                    className="rounded-full border border-white/35 bg-white/65 px-5 font-medium text-slate-900 shadow-sm backdrop-blur-xl hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                >
                    <Link href="/ai">Dashboard</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="hidden items-center gap-2 md:flex">
            <ThemeSwitcher />
            <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-full text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
                <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
                size="sm"
                asChild
                className="rounded-full border border-white/35 bg-white/65 px-5 font-medium text-slate-900 shadow-sm backdrop-blur-xl hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
                <Link href="/sign-up">Get Started →</Link>
            </Button>
        </div>
    );
}
