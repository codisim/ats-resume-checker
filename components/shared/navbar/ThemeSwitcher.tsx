"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
] as const;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const active = options.find((option) => option.value === theme) ?? options[2];
  const ActiveIcon = active.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded-full border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900"
        >
          <ActiveIcon className="size-4" />
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-36 rounded-2xl border-slate-200 bg-white p-1 shadow-lg"
      >
        {options.map(({ label, value, icon: Icon }) => {
          const isActive = value === theme;

          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-slate-600 focus:bg-slate-100 focus:text-slate-900"
            >
              <Icon className="mr-2 size-4 text-slate-500" />
              <span className="flex-1">{label}</span>
              {isActive && <span className="size-2 rounded-full bg-slate-900" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
