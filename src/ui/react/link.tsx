import { cn } from "@/src/utils/cn";
import * as React from "react";

function Link({
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & { children: React.ReactNode }) {
  return (
    <a
      className={cn(
        "text-link underline decoration-link/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export { Link };
