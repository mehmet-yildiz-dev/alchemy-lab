import { cn } from "@/src/utils/cn";
import * as React from "react";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-10 rounded-control border border-input bg-background px-3 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled-foreground disabled:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-24 resize-y rounded-control border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled-foreground disabled:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
  return <input type="checkbox" className={cn("size-4 accent-primary", className)} {...props} />;
}

export { Checkbox, Input, Textarea };
