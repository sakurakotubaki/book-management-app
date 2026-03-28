"use client";

import { Check } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { THEME_COLORS, type ThemeColor } from "@/constants/themes";

const colorClasses: Record<ThemeColor, string> = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
};

export function ThemeSelector() {
  const { themeColor, setThemeColor } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        テーマカラー
      </label>
      <div className="flex gap-2">
        {(Object.keys(THEME_COLORS) as ThemeColor[]).map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setThemeColor(color)}
            className={`relative h-8 w-8 rounded-full ${colorClasses[color]} transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
            aria-label={THEME_COLORS[color].name}
          >
            {themeColor === color && (
              <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
