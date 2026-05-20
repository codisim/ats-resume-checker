"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavActions() {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return <div className="size-[34px] rounded-full bg-slate-200 animate-pulse hidden md:block" />;
    }

    if (isSignedIn) {
        return (
            <div className="hidden md:flex items-center gap-2">
                <ThemeSwitcher />
                {/* <UserMenu /> */}
                <Button
                    size="sm"
                    asChild
                    className="rounded-full bg-slate-900 px-5 font-medium text-white hover:bg-slate-800"
                >
                    <Link href="/ai">Dashboard</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="hidden md:flex items-center gap-2">
            <ThemeSwitcher />
            <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
                <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
                size="sm"
                asChild
                className="rounded-full bg-slate-900 px-5 font-medium text-white hover:bg-slate-800"
            >
                <Link href="/sign-up">Get Started →</Link>
            </Button>
        </div>
    );
}
