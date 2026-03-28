interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}
    >
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
