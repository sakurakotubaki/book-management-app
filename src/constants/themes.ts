import {
  BookMarked,
  Bookmark,
  BookOpen,
  Library,
  NotebookPen,
} from "lucide-react";

export const THEME_COLORS = {
  blue: {
    name: "Blue",
    value: "blue",
    previewClass: "bg-blue-500",
  },
  red: {
    name: "Red",
    value: "red",
    previewClass: "bg-red-500",
  },
  green: {
    name: "Green",
    value: "green",
    previewClass: "bg-green-500",
  },
  purple: {
    name: "Purple",
    value: "purple",
    previewClass: "bg-purple-500",
  },
  orange: {
    name: "Orange",
    value: "orange",
    previewClass: "bg-orange-500",
  },
} as const;

export type ThemeColor = keyof typeof THEME_COLORS;

export const THEME_MODES = {
  light: "Light",
  dark: "Dark",
  system: "System",
} as const;

export type ThemeMode = keyof typeof THEME_MODES;

export const THEME_BOOK_ICONS = {
  blue: BookOpen,
  red: BookMarked,
  green: Library,
  purple: Bookmark,
  orange: NotebookPen,
} as const;
