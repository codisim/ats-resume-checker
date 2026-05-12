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
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
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
                className="relative rounded-full p-0.5 ring-2 ring-transparent hover:ring-[#00C896] transition-all duration-200 focus:outline-none focus:ring-[#00C896]"
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
                <div className="absolute right-0 top-12 w-52 bg-[#111816] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white truncate">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-white/40 truncate mt-0.5">
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
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <Icon size={15} className="text-white/40" />
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Sign out */}
                    <div className="p-1.5 border-t border-white/10">
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