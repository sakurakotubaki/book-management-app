"use client";

import type { SortOption, SortOrder } from "@/types/book";
import { Select } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortDropdownProps {
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortByChange: (value: SortOption) => void;
  onSortOrderToggle: () => void;
}

const sortOptions = [
  { value: "createdAt", label: "作成日" },
  { value: "title", label: "タイトル" },
];

export function SortDropdown({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderToggle,
}: SortDropdownProps) {
  return (
    <div className="flex items-center gap-1">
      <Select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortOption)}
        options={sortOptions}
        className="w-28"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={onSortOrderToggle}
        aria-label={sortOrder === "asc" ? "昇順" : "降順"}
        className="h-10 w-10"
      >
        <ArrowUpDown
          className={`h-4 w-4 transition-transform ${
            sortOrder === "desc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    </div>
  );
}
