"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeConfig } from "@/components/active-theme";

const options = [
  {
    label: "Default",
    value: "default",
    swatch: "bg-slate-500",
  },
  {
    label: "Blue",
    value: "blue",
    swatch: "bg-blue-500",
  },
  {
    label: "Green",
    value: "green",
    swatch: "bg-lime-500",
  },
  {
    label: "Amber",
    value: "amber",
    swatch: "bg-amber-500",
  },
  {
    label: "Mono",
    value: "mono",
    swatch: "bg-neutral-600",
  },
] as const;

export default function ThemeSwitcher() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const isScaled = activeTheme.endsWith("-scaled");
  const normalizedTheme = activeTheme.replace(/-scaled$/, "");
  const active =
    options.find((option) => option.value === normalizedTheme) ?? options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded-full border border-white/35 bg-white/55 text-slate-600 shadow-sm backdrop-blur-xl hover:bg-white/75 hover:text-slate-900 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15 dark:hover:text-white"
        >
          <span className={`size-2.5 rounded-full ${active.swatch}`} />
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-40 rounded-2xl border border-white/35 bg-white/70 p-1 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70"
      >
        {options.map(({ label, value, swatch }) => {
          const isActive = value === normalizedTheme;

          return (
            <DropdownMenuItem
              key={value}
              onSelect={() => setActiveTheme(isScaled ? `${value}-scaled` : value)}
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-slate-600 focus:bg-white/70 focus:text-slate-900 dark:text-slate-300 dark:focus:bg-white/10 dark:focus:text-white"
            >
              <span className={`mr-2 size-2.5 rounded-full ${swatch}`} />
              <span className="flex-1">{label}</span>
              {isActive && <span className="size-2 rounded-full bg-slate-900 dark:bg-white" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
