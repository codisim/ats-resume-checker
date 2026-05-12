"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import UserMenu from "./Usermenu";

export default function NavActions() {
    const { isLoaded, isSignedIn } = useUser();
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";

    if (!isLoaded) {
        return <div className="size-[34px] rounded-full bg-white/10 animate-pulse hidden md:block" />;
    }

    if (isSignedIn) {
        return (
            <div className="hidden md:flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="size-[34px] rounded-full border border-border text-foreground/70 hover:text-foreground hover:bg-foreground/10 hover:shadow-md transition-all"
                    aria-label="Toggle theme"
                >
                    {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>
                <UserMenu />
            </div>
        );
    }

    return (
        <div className="hidden md:flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="size-[34px] rounded-full border border-border text-foreground/70 hover:text-foreground hover:bg-foreground/10 hover:shadow-md transition-all"
                aria-label="Toggle theme"
            >
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-foreground/70 hover:text-foreground hover:bg-foreground/10 rounded-full"
            >
                <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
                size="sm"
                asChild
                className="bg-[#00C896] hover:bg-[#00A87E] text-[#0A0F0D] font-medium rounded-full px-5"
            >
                <Link href="/sign-up">Get Started →</Link>
            </Button>
        </div>
    );
}
