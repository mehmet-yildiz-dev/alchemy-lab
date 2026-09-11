"use client";

import { cn } from "@/src/utils/cn";
import * as React from "react";

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}

function Tabs({
  value,
  onValueChange,
  defaultValue,
  className,
  children,
  ...props
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
} & Omit<React.ComponentProps<"div">, "defaultValue">) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );
  const contextValue = React.useMemo(
    () => ({ value: currentValue, onValueChange: handleChange }),
    [currentValue, handleChange],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div data-slot="tabs" className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      className={cn(
        "inline-flex w-fit gap-1 rounded-surface bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  value,
  className,
  ...props
}: { value: string } & React.ComponentProps<"button">) {
  const { value: selectedValue, onValueChange } = useTabs();
  const isActive = selectedValue === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => onValueChange(value)}
      className={cn(
        "cursor-pointer rounded-control px-3 py-1.5 text-xs font-medium transition-all",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "hover:bg-background/60 hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  value,
  className,
  ...props
}: { value: string } & React.ComponentProps<"div">) {
  const { value: selectedValue } = useTabs();
  if (selectedValue !== value) return null;

  return (
    <div role="tabpanel" data-slot="tabs-content" className={cn("mt-2", className)} {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
