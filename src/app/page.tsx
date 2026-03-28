"use client";

import { useState, useMemo } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useBooks, useAddBook, useUpdateBook, useDeleteBook } from "@/hooks/use-books";
import { filterAndSortBooks } from "@/lib/book-utils";
import type { Book, BookFilters, BookFormData } from "@/types/book";
import { Header } from "@/components/layout/header";
import { SearchBar } from "@/components/layout/search-bar";
import { FilterDropdown } from "@/components/layout/filter-dropdown";
import { SortDropdown } from "@/components/layout/sort-dropdown";
import { BookGrid } from "@/components/books/book-grid";
import { BookFormModal } from "@/components/books/book-form-modal";
import { BookDeleteDialog } from "@/components/books/book-delete-dialog";
import { SettingsPanel } from "@/components/settings/settings-panel";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: books = [], isLoading } = useBooks();
  const addBook = useAddBook();
  const updateBook = useUpdateBook();
  const deleteBook = useDeleteBook();

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  // Filter states
  const [filters, setFilters] = useState<BookFilters>({
    search: "",
    status: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const filteredBooks = useMemo(
    () => filterAndSortBooks(books, filters),
    [books, filters]
  );

  const handleAddClick = () => {
    setEditingBook(undefined);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (book: Book) => {
    setDeletingBook(book);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: BookFormData) => {
    if (editingBook) {
      updateBook.mutate(
        { id: editingBook.id, data },
        {
          onSuccess: () => {
            setIsFormModalOpen(false);
            setEditingBook(undefined);
          },
        }
      );
    } else {
      addBook.mutate(data, {
        onSuccess: () => {
          setIsFormModalOpen(false);
        },
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingBook) {
      deleteBook.mutate(deletingBook.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setDeletingBook(null);
        },
      });
    }
  };

  return (
    <>
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1 sm:max-w-xs">
                <SearchBar
                  value={filters.search}
                  onChange={(search) => setFilters((f) => ({ ...f, search }))}
                />
              </div>
              <div className="flex gap-2">
                <FilterDropdown
                  value={filters.status}
                  onChange={(status) => setFilters((f) => ({ ...f, status }))}
                />
                <SortDropdown
                  sortBy={filters.sortBy}
                  sortOrder={filters.sortOrder}
                  onSortByChange={(sortBy) =>
                    setFilters((f) => ({ ...f, sortBy }))
                  }
                  onSortOrderToggle={() =>
                    setFilters((f) => ({
                      ...f,
                      sortOrder: f.sortOrder === "asc" ? "desc" : "asc",
                    }))
                  }
                />
              </div>
            </div>
            <Button onClick={handleAddClick}>
              <Plus className="mr-1.5 h-4 w-4" />
              書籍を追加
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <BookGrid
              books={filteredBooks}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </main>

      <BookFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingBook(undefined);
        }}
        book={editingBook}
        onSubmit={handleFormSubmit}
        isSubmitting={addBook.isPending || updateBook.isPending}
      />

      <BookDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeletingBook(null);
        }}
        book={deletingBook}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteBook.isPending}
      />

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
