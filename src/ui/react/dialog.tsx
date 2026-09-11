import { cn } from "@/src/utils/cn";
import * as React from "react";

type DialogProps = {
  children: React.ReactNode;
  className?: string;
  description?: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
};

function Dialog({ children, className, description, onOpenChange, open, title }: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dialog-title"
      aria-describedby={description ? "dialog-description" : undefined}
      className={cn(
        "m-auto w-[min(28rem,calc(100%-2rem))] rounded-overlay border bg-popover p-6 text-popover-foreground shadow-xl backdrop:bg-overlay",
        className,
      )}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClose={() => onOpenChange(false)}
    >
      <h2 id="dialog-title" className="text-xl font-semibold">
        {title}
      </h2>
      {description && (
        <p id="dialog-description" className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-5">{children}</div>
    </dialog>
  );
}

export { Dialog };
