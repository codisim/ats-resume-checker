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
    swatch: "#16A085",
  },
  {
    label: "Blue",
    value: "blue",
    swatch: "#2563EB",
  },
  {
    label: "Green",
    value: "green",
    swatch: "#16A34A",
  },
  {
    label: "Amber",
    value: "amber",
    swatch: "#D97706",
  },
  {
    label: "Mono",
    value: "mono",
    swatch: "#525252",
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
          className="size-9 rounded-full border border-border/70 bg-card/70 text-muted-foreground shadow-sm backdrop-blur-xl hover:bg-card hover:text-foreground"
        >
          <span className="size-2.5 rounded-full" style={{ backgroundColor: active.swatch }} />
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-40 rounded-2xl border border-border/70 bg-card/80 p-1 shadow-xl backdrop-blur-2xl"
      >
        {options.map(({ label, value, swatch }) => {
          const isActive = value === normalizedTheme;

          return (
            <DropdownMenuItem
              key={value}
              onSelect={() => setActiveTheme(isScaled ? `${value}-scaled` : value)}
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-muted-foreground focus:bg-primary/10 focus:text-foreground"
            >
              <span className="mr-2 size-2.5 rounded-full" style={{ backgroundColor: swatch }} />
              <span className="flex-1">{label}</span>
              {isActive && <span className="size-2 rounded-full bg-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
