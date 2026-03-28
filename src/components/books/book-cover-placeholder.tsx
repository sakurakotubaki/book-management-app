"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { THEME_BOOK_ICONS } from "@/constants/themes";

interface BookCoverPlaceholderProps {
  className?: string;
}

export function BookCoverPlaceholder({
  className = "",
}: BookCoverPlaceholderProps) {
  const { themeColor } = useTheme();
  const Icon = THEME_BOOK_ICONS[themeColor];

  return (
    <div
      className={`flex items-center justify-center bg-accent ${className}`}
    >
      <Icon className="h-12 w-12 text-accent-foreground" />
    </div>
  );
}
