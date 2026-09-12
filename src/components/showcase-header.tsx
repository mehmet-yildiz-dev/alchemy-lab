import { useThemeLab } from "@/src/components/theme-lab-provider";
import { Button } from "@/src/ui/react";
import { NavLink } from "react-router-dom";

const navigation = [
  { href: "/", label: "Overview", end: true },
  { href: "/foundations", label: "Foundations", end: false },
  { href: "/ui", label: "UI", end: false },
  { href: "/patterns", label: "Patterns", end: false },
] as const;

function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function ShowcaseHeader() {
  const { mode, setMode } = useThemeLab();

  return (
    <header className="sticky top-0 z-30 border-b border-border/30 bg-background/92 backdrop-blur-xl">
      <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-3 tablet:px-7 desktop:px-10">
        <NavLink to="/" className="flex items-center gap-2.5" aria-label="Digital Alchemy home">
          <img
            src={publicAsset("logo_light.svg")}
            alt="Digital Alchemy"
            className="h-8 w-auto max-w-44 dark:hidden"
          />
          <img
            src={publicAsset("logo_dark.svg")}
            alt="Digital Alchemy"
            className="hidden h-8 w-auto max-w-44 dark:block"
          />
        </NavLink>

        <nav
          className="order-3 flex w-full gap-1 overflow-x-auto tablet:order-2 tablet:w-auto"
          aria-label="Showcase"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                [
                  "whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/65 hover:text-accent-foreground",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button
          className="order-2 tablet:order-3"
          size="sm"
          variant="outline"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
        >
          <span aria-hidden="true">{mode === "dark" ? "☾" : "☀"}</span>
          {mode === "dark" ? "Dark" : "Light"}
        </Button>
      </div>
    </header>
  );
}

export { ShowcaseHeader };
