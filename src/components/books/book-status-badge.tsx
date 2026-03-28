import type { BookStatusType } from "@/types/book";
import { getStatusLabel } from "@/lib/book-utils";

interface BookStatusBadgeProps {
  status: BookStatusType;
}

const statusStyles: Record<BookStatusType, string> = {
  unread: "bg-muted text-muted-foreground",
  reading: "bg-warning/20 text-warning",
  completed: "bg-success/20 text-success",
};

export function BookStatusBadge({ status }: BookStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
