"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const links = [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Live users", href: "/#map" },
];

export default function MobileMenu() {
    const { isSignedIn, user } = useUser();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
                >
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="flex w-72 flex-col border-border bg-card/95 pt-10 shadow-xl backdrop-blur-2xl"
            >
                <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Theme</p>
                    <ThemeSwitcher />
                </div>

                <nav className="flex flex-col gap-1">
                    {links.map((l) =>
                        l.href.startsWith("#") ? (
                            <a
                                key={l.href}
                                href={l.href}
                                className="rounded-lg px-3 py-2.5 text-lg font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                                {l.label}
                            </a>
                        ) : (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="rounded-lg px-3 py-2.5 text-lg font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                                {l.label}
                            </Link>
                        )
                    )}
                </nav>

                <div className="flex flex-col gap-2 mt-auto pb-4">
                    {isSignedIn ? (
                        <>
                            <div className="mb-2 flex items-center gap-3 rounded-xl border border-border bg-secondary px-3 py-3 backdrop-blur-xl">
                                <div className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                    {user?.firstName?.[0] ?? "U"}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{user?.firstName}</p>
                                    <p className="max-w-[160px] truncate text-xs text-muted-foreground">
                                        {user?.emailAddresses[0]?.emailAddress}
                                    </p>
                                </div>
                            </div>
                            <Button asChild className="rounded-full border border-border bg-card text-foreground shadow-sm backdrop-blur-xl hover:bg-secondary">
                                <Link href="/ai">Dashboard</Link>
                            </Button>
                            <SignOutButton>
                                <Button variant="ghost" className="text-danger hover:bg-danger/10 hover:text-danger">
                                    Sign out
                                </Button>
                            </SignOutButton>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" asChild className="text-muted-foreground hover:bg-secondary hover:text-foreground">
                                <Link href="/sign-in">Sign in</Link>
                            </Button>
                            <Button asChild className="rounded-full border border-border bg-card font-medium text-foreground shadow-sm backdrop-blur-xl hover:bg-secondary">
                                <Link href="/sign-up">Get Started →</Link>
                            </Button>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
