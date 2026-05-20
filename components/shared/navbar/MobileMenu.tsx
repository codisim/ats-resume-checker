"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Live users 🌍", href: "#map" },
];

export default function MobileMenu() {
    const { isSignedIn, user } = useUser();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white md:hidden"
                >
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="flex w-72 flex-col border-white/30 bg-white/75 pt-10 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70"
            >
                <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-300">Theme</p>
                    <ThemeSwitcher />
                </div>

                <nav className="flex flex-col gap-1">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="rounded-lg px-3 py-2.5 text-lg font-medium text-slate-600 transition-colors hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="flex flex-col gap-2 mt-auto pb-4">
                    {isSignedIn ? (
                        <>
                            <div className="mb-2 flex items-center gap-3 rounded-xl border border-white/35 bg-white/55 px-3 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                                <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-sky-400 grid place-items-center text-xs font-semibold text-white">
                                    {user?.firstName?.[0] ?? "U"}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.firstName}</p>
                                    <p className="max-w-[160px] truncate text-xs text-slate-500 dark:text-slate-300">
                                        {user?.emailAddresses[0]?.emailAddress}
                                    </p>
                                </div>
                            </div>
                            <Button asChild className="rounded-full border border-white/35 bg-white/65 text-slate-900 shadow-sm backdrop-blur-xl hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <SignOutButton>
                                <Button variant="ghost" className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10">
                                    Sign out
                                </Button>
                            </SignOutButton>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" asChild className="text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white">
                                <Link href="/sign-in">Sign in</Link>
                            </Button>
                            <Button asChild className="rounded-full border border-white/35 bg-white/65 font-medium text-slate-900 shadow-sm backdrop-blur-xl hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
                                <Link href="/sign-up">Get Started →</Link>
                            </Button>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
