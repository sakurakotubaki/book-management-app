"use client";

import type { Book } from "@/types/book";
import { BookCard } from "./book-card";
import { BookOpen } from "lucide-react";

interface BookGridProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export function BookGrid({ books, onEdit, onDelete }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="rounded-full bg-muted p-6">
          <BookOpen className="h-12 w-12 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            書籍がありません
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            「書籍を追加」ボタンから最初の一冊を登録しましょう
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
