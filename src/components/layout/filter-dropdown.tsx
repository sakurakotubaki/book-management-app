"use client";

import type { BookStatusType } from "@/types/book";
import { Select } from "@/components/ui/select";

interface FilterDropdownProps {
  value: BookStatusType | "all";
  onChange: (value: BookStatusType | "all") => void;
}

const filterOptions = [
  { value: "all", label: "すべて" },
  { value: "unread", label: "未読" },
  { value: "reading", label: "読書中" },
  { value: "completed", label: "完読" },
];

export function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as BookStatusType | "all")}
      options={filterOptions}
      className="w-32"
    />
  );
}
