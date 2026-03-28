"use client";

import Image from "next/image";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import type { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { BookCoverPlaceholder } from "./book-cover-placeholder";
import { BookProgressBar } from "./book-progress-bar";
import { BookStatusBadge } from "./book-status-badge";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <BookCoverPlaceholder className="h-full w-full" />
        )}
        <div className="absolute top-2 right-2">
          <BookStatusBadge status={book.status} />
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-semibold text-card-foreground">
            {book.title}
          </h3>
          {book.url && (
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-muted-foreground hover:text-primary"
              aria-label="外部リンクを開く"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <BookProgressBar
          currentPage={book.currentPage}
          totalPages={book.totalPages}
        />

        <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(book)}
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            編集
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(book)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
