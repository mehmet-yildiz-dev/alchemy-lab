import { cn } from "@/src/utils/cn";
import * as React from "react";

function EmptyState({
  action,
  children,
  className,
  title,
}: React.ComponentProps<"div"> & { action?: React.ReactNode; title: string }) {
  return (
    <div
      className={cn(
        "grid justify-items-center rounded-surface border border-dashed bg-muted/50 px-6 py-10 text-center",
        className,
      )}
    >
      <div className="grid size-10 place-items-center rounded-full bg-background text-muted-foreground">
        ✦
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{children}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export { EmptyState };
