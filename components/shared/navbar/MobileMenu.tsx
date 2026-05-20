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
                    className="text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
                >
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="flex w-72 flex-col border-slate-200 bg-white pt-10"
            >
                <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">Appearance</p>
                    <ThemeSwitcher />
                </div>

                <nav className="flex flex-col gap-1">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="rounded-lg px-3 py-2.5 text-lg font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="flex flex-col gap-2 mt-auto pb-4">
                    {isSignedIn ? (
                        <>
                            <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
                                <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-sky-400 grid place-items-center text-xs font-semibold text-white">
                                    {user?.firstName?.[0] ?? "U"}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{user?.firstName}</p>
                                    <p className="max-w-[160px] truncate text-xs text-slate-500">
                                        {user?.emailAddresses[0]?.emailAddress}
                                    </p>
                                </div>
                            </div>
                            <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <SignOutButton>
                            <Button variant="ghost" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                                Sign out
                            </Button>
                            </SignOutButton>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" asChild className="text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                                <Link href="/sign-in">Sign in</Link>
                            </Button>
                            <Button asChild className="rounded-full bg-slate-900 font-medium text-white hover:bg-slate-800">
                                <Link href="/sign-up">Get Started →</Link>
                            </Button>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
