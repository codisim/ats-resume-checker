"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import {
    LayoutDashboard,
    UserCircle,
    Settings,
    LogOut,
} from "lucide-react";

const menuItems = [
    { label: "Dashboard", href: "/ai", icon: LayoutDashboard },
    { label: "Profile", href: "/profile", icon: UserCircle },
    { label: "Settings", href: "/settings", icon: Settings },
];


export default function UserMenu() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Avatar trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="relative cursor-pointer rounded-full border border-border p-0.5 ring-2 ring-[#00C896]/65 transition-shadow duration-300 ease-out hover:shadow-[0_0_0_4px_rgba(0,200,150,0.18)] focus:outline-none focus:ring-[#00C896]"
                aria-label="User menu"
            >
                {user?.imageUrl ? (
                    <Image
                        src={user.imageUrl}
                        alt={user.firstName ?? "User"}
                        width={34}
                        height={34}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <div className="size-[34px] rounded-full bg-gradient-to-br from-[#00C896] to-[#7B61FF] grid place-items-center text-[#0A0F0D] text-sm font-semibold">
                        {user?.firstName?.[0] ?? "U"}
                    </div>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl">
                    {/* User info header */}
                    <div className="border-b border-border px-4 py-3">
                        <p className="truncate text-sm font-medium text-foreground">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {user?.emailAddresses[0]?.emailAddress}
                        </p>
                    </div>

                    {/* Menu items */}
                    <div className="p-1.5">
                        {menuItems.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <Icon size={15} className="text-muted-foreground" />
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-border p-1.5">
                        <SignOutButton>
                            <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                <LogOut size={15} />
                                Sign out
                            </button>
                        </SignOutButton>
                    </div>
                </div>
            )}
        </div>
    );
}
