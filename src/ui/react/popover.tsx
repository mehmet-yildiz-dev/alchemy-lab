import { cn } from "@/src/utils/cn";
import * as React from "react";

type PopoverProps = {
  className?: string;
  content: React.ReactNode;
  trigger: React.ReactNode;
};

function Popover({ className, content, trigger }: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const closeOnOutsidePress = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node))
        setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
      >
        {trigger}
      </button>
      {open && (
        <section
          aria-label="Popover"
          className="absolute right-0 z-50 mt-2 min-w-56 rounded-overlay border bg-popover p-3 text-popover-foreground shadow-lg"
        >
          {content}
        </section>
      )}
    </div>
  );
}

export { Popover };
