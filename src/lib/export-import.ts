import type { Book } from "@/types/book";
import { getBooks, setBooks } from "./storage";

export function exportBooksToJson(): string {
  const books = getBooks();
  return JSON.stringify(books, null, 2);
}

export function downloadBooksAsJson(): void {
  const json = exportBooksToJson();
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `books-backup-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface ImportResult {
  success: boolean;
  imported: number;
  error?: string;
}

export async function importBooksFromJson(file: File): Promise<ImportResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (typeof content !== "string") {
          resolve({
            success: false,
            imported: 0,
            error: "ファイルを読み込めませんでした",
          });
          return;
        }

        const parsed = JSON.parse(content);

        if (!Array.isArray(parsed)) {
          resolve({ success: false, imported: 0, error: "無効な形式です" });
          return;
        }

        const validBooks: Book[] = parsed.filter(
          (item): item is Book =>
            typeof item === "object" &&
            item !== null &&
            typeof item.id === "string" &&
            typeof item.title === "string" &&
            typeof item.createdAt === "string" &&
            typeof item.totalPages === "number" &&
            typeof item.currentPage === "number" &&
            typeof item.status === "string",
        );

        if (validBooks.length === 0) {
          resolve({
            success: false,
            imported: 0,
            error: "有効な書籍データがありません",
          });
          return;
        }

        setBooks(validBooks);
        resolve({ success: true, imported: validBooks.length });
      } catch {
        resolve({
          success: false,
          imported: 0,
          error: "JSONの解析に失敗しました",
        });
      }
    };

    reader.onerror = () => {
      resolve({
        success: false,
        imported: 0,
        error: "ファイルの読み込みに失敗しました",
      });
    };

    reader.readAsText(file);
  });
}
