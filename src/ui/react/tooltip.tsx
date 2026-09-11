"use client";

import { cn } from "@/src/utils/cn";
import * as React from "react";
import { createPortal } from "react-dom";

type TooltipPlacement = "top" | "bottom" | "left" | "right" | "mouse";

// ─── Reusable styled content box ──────────────────────────────────────
// Use this wherever you need the themed tooltip look (e.g. recharts custom tooltip)
type TooltipContentProps = React.HTMLAttributes<HTMLDivElement>;

function TooltipContent({ className, children, ...props }: TooltipContentProps) {
  return (
    <div
      className={cn(
        "rounded-overlay border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Hover tooltip wrapper for regular DOM elements ───────────────────
type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** "top" / "bottom" / "left" / "right" anchor to element. "mouse" follows cursor. */
  placement?: TooltipPlacement;
  /** Offset in pixels from the anchor point */
  offset?: number;
  /** Show delay in ms (defaults to 0) */
  delay?: number;
};

function Tooltip({
  content,
  children,
  className,
  placement = "mouse",
  offset = 12,
  delay = 0,
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const mounted = typeof document !== "undefined";
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const showTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get the bounding rect of the trigger's first child element
  // (since display:contents makes the span itself have no box)
  const getTriggerRect = React.useCallback((): DOMRect | null => {
    const el = triggerRef.current;
    if (!el) return null;
    const firstChild = el.firstElementChild as HTMLElement | null;
    if (firstChild) return firstChild.getBoundingClientRect();
    return el.getBoundingClientRect();
  }, []);

  const updatePosition = React.useCallback(
    (mouseX: number, mouseY: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const tooltipEl = tooltipRef.current;
      const tw = tooltipEl?.offsetWidth ?? 200;
      const th = tooltipEl?.offsetHeight ?? 40;

      let x = mouseX;
      let y = mouseY;

      if (placement === "mouse") {
        x = mouseX + offset;
        y = mouseY + offset;
        if (x + tw > vw - 8) x = mouseX - offset - tw;
        if (y + th > vh - 8) y = mouseY - offset - th;
        if (x < 8) x = 8;
        if (y < 8) y = 8;
      } else {
        const rect = getTriggerRect();
        if (rect && rect.width > 0) {
          const cx = rect.left + rect.width / 2;
          if (placement === "top") {
            x = cx - tw / 2;
            y = rect.top - offset - th;
            if (y < 8) y = rect.bottom + offset;
          } else if (placement === "bottom") {
            x = cx - tw / 2;
            y = rect.bottom + offset;
            if (y + th > vh - 8) y = rect.top - offset - th;
          } else if (placement === "left") {
            x = rect.left - offset - tw;
            y = rect.top + rect.height / 2 - th / 2;
          } else if (placement === "right") {
            x = rect.right + offset;
            y = rect.top + rect.height / 2 - th / 2;
          }
        }
        if (x + tw > vw - 8) x = vw - tw - 8;
        if (x < 8) x = 8;
        if (y + th > vh - 8) y = vh - th - 8;
        if (y < 8) y = 8;
      }

      setCoords({ x, y });
    },
    [placement, offset, getTriggerRect],
  );

  const show = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    if (delay > 0) {
      showTimer.current = setTimeout(() => {
        setVisible(true);
        requestAnimationFrame(() => {
          updatePosition(x, y);
          // Second pass after DOM has painted with correct dimensions
          requestAnimationFrame(() => updatePosition(x, y));
        });
      }, delay);
    } else {
      setVisible(true);
      requestAnimationFrame(() => {
        updatePosition(x, y);
        requestAnimationFrame(() => updatePosition(x, y));
      });
    }
  };

  const move = (e: React.MouseEvent) => {
    if (!visible) return;
    if (placement === "mouse") {
      updatePosition(e.clientX, e.clientY);
    }
  };

  const hide = () => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    setVisible(false);
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={show}
        onMouseMove={move}
        onMouseLeave={hide}
        style={{ display: "contents" }}
      >
        {children}
      </span>
      {mounted &&
        visible &&
        createPortal(
          <div
            ref={tooltipRef}
            className="pointer-events-none fixed z-9999"
            style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
          >
            <TooltipContent className={cn("whitespace-nowrap", className)}>
              {content}
            </TooltipContent>
          </div>,
          document.body,
        )}
    </>
  );
}

export { Tooltip, TooltipContent };
