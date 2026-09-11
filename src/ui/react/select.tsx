"use client";

import { cn } from "@/src/utils/cn";
import * as React from "react";

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-8 rounded-control border border-input bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors",
        "hover:bg-muted focus:border-ring focus:ring-2 focus:ring-ring/30 focus:outline-none disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled-foreground disabled:opacity-100",
        "[&>option]:bg-background [&>option]:text-foreground",
        "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-size-[12px] bg-position-[right_8px_center] bg-no-repeat pr-7",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export { Select };
