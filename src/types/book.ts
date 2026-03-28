export const BookStatus = {
  UNREAD: "unread",
  READING: "reading",
  COMPLETED: "completed",
} as const;

export type BookStatusType = (typeof BookStatus)[keyof typeof BookStatus];

export interface Book {
  id: string;
  createdAt: string;
  title: string;
  url?: string;
  totalPages: number;
  currentPage: number;
  imageUrl?: string;
  status: BookStatusType;
}

export interface BookFormData {
  title: string;
  url?: string;
  totalPages: number;
  currentPage: number;
  imageUrl?: string;
  status: BookStatusType;
}

export type SortOption = "createdAt" | "title";
export type SortOrder = "asc" | "desc";

export interface BookFilters {
  search: string;
  status: BookStatusType | "all";
  sortBy: SortOption;
  sortOrder: SortOrder;
}
