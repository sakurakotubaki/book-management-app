import { Progress } from "@/components/ui/progress";
import { calculateProgress } from "@/lib/book-utils";

interface BookProgressBarProps {
  currentPage: number;
  totalPages: number;
  showLabel?: boolean;
}

export function BookProgressBar({
  currentPage,
  totalPages,
  showLabel = true,
}: BookProgressBarProps) {
  const progress = calculateProgress(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-1">
      <Progress value={progress} />
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {currentPage} / {totalPages} ページ
          </span>
          <span>{progress}%</span>
        </div>
      )}
    </div>
  );
}
