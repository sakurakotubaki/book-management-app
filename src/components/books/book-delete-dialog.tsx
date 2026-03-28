"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Book } from "@/types/book";

interface BookDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function BookDeleteDialog({
  isOpen,
  onClose,
  book,
  onConfirm,
  isDeleting = false,
}: BookDeleteDialogProps) {
  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="書籍を削除">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <div>
          <p className="font-medium text-foreground">
            「{book.title}」を削除しますか？
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            この操作は取り消せません。
          </p>
        </div>
        <div className="flex w-full gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={isDeleting}
          >
            キャンセル
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "削除中..." : "削除"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
