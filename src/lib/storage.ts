import { STORAGE_KEYS } from "@/constants/storage-keys";
import type { Book } from "@/types/book";
import type { ThemeColor, ThemeMode } from "@/constants/themes";

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or other error
  }
}

export function getBooks(): Book[] {
  return getItem<Book[]>(STORAGE_KEYS.BOOKS, []);
}

export function setBooks(books: Book[]): void {
  setItem(STORAGE_KEYS.BOOKS, books);
}

export function getThemeMode(): ThemeMode {
  return getItem<ThemeMode>(STORAGE_KEYS.THEME_MODE, "system");
}

export function setThemeMode(mode: ThemeMode): void {
  setItem(STORAGE_KEYS.THEME_MODE, mode);
}

export function getThemeColor(): ThemeColor {
  return getItem<ThemeColor>(STORAGE_KEYS.THEME_COLOR, "blue");
}

export function setThemeColor(color: ThemeColor): void {
  setItem(STORAGE_KEYS.THEME_COLOR, color);
}
