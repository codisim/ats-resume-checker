"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

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
                    className="text-foreground/70 hover:text-foreground hover:bg-foreground/10 md:hidden"
                >
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="flex w-72 flex-col border-border bg-background pt-10"
            >
                <nav className="flex flex-col gap-1">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="rounded-lg px-3 py-2.5 text-lg font-medium text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="flex flex-col gap-2 mt-auto pb-4">
                    {isSignedIn ? (
                        <>
                            <div className="mb-2 flex items-center gap-3 rounded-xl bg-foreground/5 px-3 py-3">
                                <div className="size-8 rounded-full bg-gradient-to-br from-[#00C896] to-[#7B61FF] grid place-items-center text-xs font-semibold text-[#0A0F0D]">
                                    {user?.firstName?.[0] ?? "U"}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{user?.firstName}</p>
                                    <p className="max-w-[160px] truncate text-xs text-muted-foreground">
                                        {user?.emailAddresses[0]?.emailAddress}
                                    </p>
                                </div>
                            </div>
                            <Button asChild className="bg-[#00C896] hover:bg-[#00A87E] text-[#0A0F0D] rounded-full">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <SignOutButton>
                            <Button variant="ghost" className="text-red-500 hover:bg-red-500/10 hover:text-red-400">
                                Sign out
                            </Button>
                            </SignOutButton>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" asChild className="text-foreground/70 hover:text-foreground hover:bg-foreground/10">
                                <Link href="/sign-in">Sign in</Link>
                            </Button>
                            <Button asChild className="bg-[#00C896] hover:bg-[#00A87E] text-[#0A0F0D] font-medium rounded-full">
                                <Link href="/sign-up">Get Started →</Link>
                            </Button>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
