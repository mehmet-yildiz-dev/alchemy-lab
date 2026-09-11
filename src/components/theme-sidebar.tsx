import { useThemeLab } from "@/src/components/theme-lab-provider";
import {
  ALCHEMY_COLORS,
  FONT_SETS,
  MOTION_PRESETS,
  RADIUS_PRESETS,
  TOKEN_GROUPS,
  TOKEN_HELP,
  type AlchemyColor,
  type FontSet,
  type MotionPreset,
  type RadiusPreset,
  type TokenDefinition,
} from "@/src/foundation/theme";
import { Button, Select, Separator, Tooltip } from "@/src/ui/react";
import * as React from "react";

function TokenControl({ token }: { token: TokenDefinition }) {
  const theme = useThemeLab();
  const value = theme.tokens[token.key];

  return (
    <label
      className="grid grid-cols-[minmax(0,1fr)_7rem] items-center gap-2 text-xs"
      htmlFor={`token-${token.key}`}
    >
      <Tooltip
        content={TOKEN_HELP[token.key] ?? "A configurable semantic theme role."}
        placement="right"
      >
        <span className="flex min-w-0 items-center gap-2 underline decoration-dotted underline-offset-4">
          <i
            className="size-2.5 shrink-0 rounded-full ring-1 ring-border/40"
            style={{ background: `var(--${value})` }}
          />
          <span className="truncate">{token.label}</span>
        </span>
      </Tooltip>
      <Select
        id={`token-${token.key}`}
        value={value}
        onChange={(event) => theme.setToken(token.key, event.target.value as AlchemyColor)}
      >
        {ALCHEMY_COLORS.map((color) => (
          <option key={color}>{color}</option>
        ))}
      </Select>
    </label>
  );
}

function StructuralControls() {
  const theme = useThemeLab();

  return (
    <section>
      <h3 className="text-sm font-semibold text-foreground">Structure</h3>
      <p className="mt-1 text-xs leading-4 text-muted-foreground">
        Document-level presets; reusable UI keeps using roles.
      </p>
      <div className="mt-3 grid gap-3">
        <label className="grid gap-1.5 text-xs" htmlFor="font-set">
          Font set
          <Select
            id="font-set"
            value={theme.fontSet}
            onChange={(event) => theme.setFontSet(event.target.value as FontSet)}
          >
            {FONT_SETS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <span className="text-[0.6875rem] text-muted-foreground">
            {FONT_SETS.find(({ value }) => value === theme.fontSet)?.description}
          </span>
        </label>
        <label className="grid gap-1.5 text-xs" htmlFor="radius-preset">
          Radius
          <Select
            id="radius-preset"
            value={theme.radius}
            onChange={(event) => theme.setRadius(event.target.value as RadiusPreset)}
          >
            {RADIUS_PRESETS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
        <label className="grid gap-1.5 text-xs" htmlFor="motion-preset">
          Motion
          <Select
            id="motion-preset"
            value={theme.motion}
            onChange={(event) => theme.setMotion(event.target.value as MotionPreset)}
          >
            {MOTION_PRESETS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
      </div>
    </section>
  );
}

function ThemeSidebar() {
  const theme = useThemeLab();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <aside className="theme-sidebar sticky top-0 z-40 max-h-dvh overflow-y-auto border-b border-border/40 bg-muted tablet:h-dvh tablet:border-r tablet:border-b-0">
      <div className="p-4 tablet:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Alchemy
            </p>
            <h2 className="mt-1 text-xl text-foreground">Style controls</h2>
          </div>
          <div className="flex gap-1">
            <Button size="xs" variant="ghost" onClick={theme.reset}>
              Reset
            </Button>
            <Button
              className="tablet:hidden"
              size="xs"
              variant="outline"
              onClick={() => setMobileOpen((current) => !current)}
              aria-expanded={mobileOpen}
              aria-controls="theme-sidebar-controls"
            >
              {mobileOpen ? "Close" : "Edit"}
            </Button>
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Tune semantic roles and structural presets. Choices persist in this browser.
        </p>

        <div
          id="theme-sidebar-controls"
          className={`${mobileOpen ? "block" : "hidden"} tablet:block`}
        >
          <Separator className="my-5" />
          <div className="grid gap-6">
            <StructuralControls />
            {TOKEN_GROUPS.map((group) => (
              <section key={group.name}>
                <h3 className="text-sm font-semibold text-foreground">{group.name}</h3>
                <p className="mt-1 text-xs leading-4 text-muted-foreground">{group.description}</p>
                <div className="mt-3 grid gap-2">
                  {group.tokens.map((token) => (
                    <TokenControl key={token.key} token={token} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export { ThemeSidebar };
