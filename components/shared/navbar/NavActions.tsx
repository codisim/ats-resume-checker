"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavActions() {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return <div className="hidden size-[34px] animate-pulse rounded-full bg-muted md:block" />;
    }

    if (isSignedIn) {
        return (
            <div className="hidden items-center gap-2 md:flex">
                <ThemeSwitcher />
                {/* <UserMenu /> */}
                <Button
                    size="sm"
                    asChild
                    className="rounded-full border border-border bg-card px-5 font-medium text-foreground shadow-sm backdrop-blur-xl hover:bg-secondary"
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
                className="rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
                <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
                size="sm"
                asChild
                className="rounded-full border border-border bg-card px-5 font-medium text-foreground shadow-sm backdrop-blur-xl hover:bg-secondary"
            >
                <Link href="/sign-up">Get Started →</Link>
            </Button>
        </div>
    );
}
