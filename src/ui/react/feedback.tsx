import { cn } from "@/src/utils/cn";
import * as React from "react";

type AlertTone = "info" | "success" | "warning" | "danger";

const toneClasses: Record<AlertTone, string> = {
  info: "border-info bg-info/10 text-foreground",
  success: "border-success bg-success/10 text-foreground",
  warning: "border-warning bg-warning/10 text-foreground",
  danger: "border-destructive bg-destructive/10 text-foreground",
};

function Alert({
  tone = "info",
  className,
  ...props
}: React.ComponentProps<"output"> & { tone?: AlertTone }) {
  return (
    <output
      className={cn("rounded-surface border px-4 py-3 text-sm", toneClasses[tone], className)}
      {...props}
    />
  );
}

function Progress({
  value,
  className,
  ...props
}: React.ComponentProps<"progress"> & { value: number }) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <progress
      value={safeValue}
      max={100}
      className={cn("alchemy-progress h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    />
  );
}

export { Alert, Progress };
