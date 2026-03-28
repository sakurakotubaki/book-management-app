"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { Book, BookFormData, BookStatusType } from "@/types/book";
import { BookStatus } from "@/types/book";

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const statusOptions = [
  { value: BookStatus.UNREAD, label: "未読" },
  { value: BookStatus.READING, label: "読書中" },
  { value: BookStatus.COMPLETED, label: "完読" },
];

export function BookForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [url, setUrl] = useState(initialData?.url ?? "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [totalPages, setTotalPages] = useState(
    initialData?.totalPages?.toString() ?? "",
  );
  const [currentPage, setCurrentPage] = useState(
    initialData?.currentPage?.toString() ?? "0",
  );
  const [status, setStatus] = useState<BookStatusType>(
    initialData?.status ?? BookStatus.UNREAD,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "タイトルは必須です";
    }

    const totalPagesNum = Number.parseInt(totalPages, 10);
    if (!totalPages || Number.isNaN(totalPagesNum) || totalPagesNum <= 0) {
      newErrors.totalPages = "有効なページ数を入力してください";
    }

    const currentPageNum = Number.parseInt(currentPage, 10);
    if (Number.isNaN(currentPageNum) || currentPageNum < 0) {
      newErrors.currentPage = "有効なページ数を入力してください";
    } else if (currentPageNum > totalPagesNum) {
      newErrors.currentPage = "現在のページは総ページ数以下にしてください";
    }

    if (url && !isValidUrl(url)) {
      newErrors.url = "有効なURLを入力してください";
    }

    if (imageUrl && !isValidUrl(imageUrl)) {
      newErrors.imageUrl = "有効なURLを入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const data: BookFormData = {
      title: title.trim(),
      url: url.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      totalPages: Number.parseInt(totalPages, 10),
      currentPage: Number.parseInt(currentPage, 10),
      status,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="title"
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        placeholder="書籍のタイトル"
        required
      />

      <Input
        id="url"
        label="URL（Amazon等）"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        error={errors.url}
        placeholder="https://www.amazon.co.jp/..."
      />

      <Input
        id="imageUrl"
        label="表紙画像URL"
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        error={errors.imageUrl}
        placeholder="https://..."
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="totalPages"
          label="総ページ数"
          type="number"
          min="1"
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
          error={errors.totalPages}
          placeholder="300"
          required
        />

        <Input
          id="currentPage"
          label="現在のページ"
          type="number"
          min="0"
          value={currentPage}
          onChange={(e) => setCurrentPage(e.target.value)}
          error={errors.currentPage}
          placeholder="0"
        />
      </div>

      <Select
        id="status"
        label="ステータス"
        value={status}
        onChange={(e) => setStatus(e.target.value as BookStatusType)}
        options={statusOptions}
      />

      <div className="mt-2 flex gap-3">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          キャンセル
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : initialData ? "更新" : "追加"}
        </Button>
      </div>
    </form>
  );
}
