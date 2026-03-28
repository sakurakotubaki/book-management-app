import type { Book, BookFilters, BookStatusType } from "@/types/book";

export function calculateProgress(currentPage: number, totalPages: number): number {
  if (totalPages <= 0) return 0;
  const progress = (currentPage / totalPages) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
}

export function getStatusLabel(status: BookStatusType): string {
  const labels: Record<BookStatusType, string> = {
    unread: "未読",
    reading: "読書中",
    completed: "完読",
  };
  return labels[status];
}

export function filterBooks(books: Book[], filters: BookFilters): Book[] {
  return books.filter((book) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!book.title.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Status filter
    if (filters.status !== "all" && book.status !== filters.status) {
      return false;
    }

    return true;
  });
}

export function sortBooks(books: Book[], sortBy: BookFilters["sortBy"], sortOrder: BookFilters["sortOrder"]): Book[] {
  const sorted = [...books].sort((a, b) => {
    if (sortBy === "createdAt") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return a.title.localeCompare(b.title, "ja");
  });

  if (sortOrder === "desc") {
    sorted.reverse();
  }

  return sorted;
}

export function filterAndSortBooks(books: Book[], filters: BookFilters): Book[] {
  const filtered = filterBooks(books, filters);
  return sortBooks(filtered, filters.sortBy, filters.sortOrder);
}
