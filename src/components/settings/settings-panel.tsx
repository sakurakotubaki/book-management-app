"use client";

import { Modal } from "@/components/ui/modal";
import { DarkModeToggle } from "./dark-mode-toggle";
import { ThemeSelector } from "./theme-selector";
import { DataManagement } from "./data-management";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="設定">
      <div className="flex flex-col gap-6">
        <DarkModeToggle />
        <ThemeSelector />
        <hr className="border-border" />
        <DataManagement />
      </div>
    </Modal>
  );
}
