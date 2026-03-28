"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Download, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { downloadBooksAsJson, importBooksFromJson } from "@/lib/export-import";

export function DataManagement() {
  const [importStatus, setImportStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleExport = () => {
    downloadBooksAsJson();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus(null);
    const result = await importBooksFromJson(file);

    if (result.success) {
      setImportStatus({
        type: "success",
        message: `${result.imported}冊の書籍をインポートしました`,
      });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    } else {
      setImportStatus({
        type: "error",
        message: result.error ?? "インポートに失敗しました",
      });
    }

    // Reset file input
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-foreground">データ管理</label>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={handleExport}>
          <Download className="mr-1.5 h-4 w-4" />
          エクスポート
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={handleImportClick}
        >
          <Upload className="mr-1.5 h-4 w-4" />
          インポート
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {importStatus && (
        <p
          className={`text-sm ${
            importStatus.type === "success"
              ? "text-success"
              : "text-destructive"
          }`}
        >
          {importStatus.message}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        エクスポートでJSON形式のバックアップを作成できます。インポートで復元できます。
      </p>
    </div>
  );
}
