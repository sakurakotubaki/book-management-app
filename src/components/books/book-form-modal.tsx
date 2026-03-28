"use client";

import { Modal } from "@/components/ui/modal";
import type { Book, BookFormData } from "@/types/book";
import { BookForm } from "./book-form";

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
  onSubmit: (data: BookFormData) => void;
  isSubmitting?: boolean;
}

export function BookFormModal({
  isOpen,
  onClose,
  book,
  onSubmit,
  isSubmitting = false,
}: BookFormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={book ? "書籍を編集" : "書籍を追加"}
    >
      <BookForm
        initialData={book}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
