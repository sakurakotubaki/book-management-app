"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import type { ThemeMode } from "@/constants/themes";

const modes: { value: ThemeMode; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "ライト" },
  { value: "dark", icon: Moon, label: "ダーク" },
  { value: "system", icon: Monitor, label: "システム" },
];

export function DarkModeToggle() {
  const { themeMode, setThemeMode } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">表示モード</label>
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {modes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setThemeMode(value)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              themeMode === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
