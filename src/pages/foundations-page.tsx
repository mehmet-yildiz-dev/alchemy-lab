import { PageHeader } from "@/src/components/page-header";
import { RatingMeter } from "@/src/components/patterns";
import { Specimen } from "@/src/components/specimen";
import { useThemeLab } from "@/src/components/theme-lab-provider";
import {
  DEFAULT_RATING_THRESHOLDS,
  RATING_SCALE,
  type RatingThresholds,
} from "@/src/foundation/rating-scale";
import { ALCHEMY_COLORS, FONT_SETS, MOTION_PRESETS, RADIUS_PRESETS } from "@/src/foundation/theme";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input } from "@/src/ui/react";
import * as React from "react";

const materialClasses = {
  obsidian: "bg-obsidian",
  diamond: "bg-diamond",
  pearl: "bg-pearl",
  titanium: "bg-titanium",
  platinum: "bg-platinum",
  gold: "bg-gold",
  silver: "bg-silver",
  quicksilver: "bg-quicksilver",
  sapphire: "bg-sapphire",
  ruby: "bg-ruby",
  emerald: "bg-emerald",
  amethyst: "bg-amethyst",
  topaz: "bg-topaz",
} as const;

const ratingClasses = {
  lowest: "bg-rating-lowest",
  low: "bg-rating-low",
  middle: "bg-rating-middle",
  high: "bg-rating-high",
  highest: "bg-rating-highest",
} as const;

function FoundationsPage() {
  const theme = useThemeLab();
  const [ratingThresholds, setRatingThresholds] = React.useState<RatingThresholds>(() => [
    ...DEFAULT_RATING_THRESHOLDS,
  ]);

  function updateRatingThreshold(index: number, rawValue: string) {
    const parsed = Number(rawValue);
    if (!Number.isFinite(parsed)) return;

    setRatingThresholds((current) => {
      const currentPercentages = current.map((threshold) => Math.round(threshold * 100));
      const minimum = index === 0 ? 1 : (currentPercentages[index - 1] ?? 0) + 1;
      const maximum =
        index === current.length - 1 ? 99 : (currentPercentages[index + 1] ?? 100) - 1;
      const next = [...currentPercentages] as unknown as [number, number, number, number];
      next[index] = Math.min(maximum, Math.max(minimum, Math.round(parsed)));
      return next.map((percentage) => percentage / 100) as unknown as RatingThresholds;
    });
  }

  return (
    <div className="animate-fade-in grid gap-8">
      <PageHeader
        eyebrow="Design foundations"
        title="Materials supply character. Roles supply meaning."
        description="Raw metals and gemstones adapt between light and dark. Semantic assignments remain stable, while typography, radius, and motion are document-level presets shared by every route."
      />

      <Specimen
        name="Material palette"
        description="Raw materials are appropriate here because this is the palette specimen—not application UI."
      >
        <div className="grid grid-cols-2 gap-3 tablet:grid-cols-4 wide:grid-cols-7">
          {ALCHEMY_COLORS.map((color) => (
            <div key={color} className="rounded-control border border-border/40 bg-background p-2">
              <div
                className={`border-black/10 h-16 rounded-control border ${materialClasses[color]}`}
              />
              <p className="mt-2 text-xs font-semibold text-foreground capitalize">{color}</p>
              <p className="mt-0.5 font-mono text-[0.625rem] text-muted-foreground">
                var(--{color})
              </p>
            </div>
          ))}
        </div>
      </Specimen>

      <Specimen
        name="Rating order"
        description="The permanent preference scale is ruby, topaz, emerald, sapphire, then amethyst from lower to higher. It is not a traffic-light scale."
      >
        <div className="grid gap-6 desktop:grid-cols-[1fr_22rem]">
          <ol className="grid grid-cols-5 overflow-hidden rounded-surface border border-border/40">
            {RATING_SCALE.map((entry) => (
              <li
                key={entry.level}
                className={`${ratingClasses[entry.name]} min-w-0 px-2 py-6 text-center text-diamond`}
              >
                <p className="font-display text-xl font-bold">{entry.level}</p>
                <p className="mt-1 truncate text-xs font-semibold">{entry.label}</p>
                <p className="mt-1 hidden text-[0.625rem] capitalize opacity-80 tablet:block">
                  {entry.material}
                </p>
              </li>
            ))}
          </ol>
          <RatingMeter score={84} thresholds={ratingThresholds} />
        </div>
        <div className="mt-6 rounded-surface border border-border/40 bg-muted p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-foreground">Editable band endpoints</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Set where each band ends. Values stay ordered so the scale remains valid.
              </p>
            </div>
            <p className="font-mono text-xs text-metadata">
              {ratingThresholds
                .map((threshold) => String(Math.round(threshold * 100)) + "%")
                .join(" · ")}
            </p>
          </div>
          <div className="mt-4 grid gap-3 tablet:grid-cols-4">
            {["Lowest ends", "Low ends", "Middle ends", "High ends"].map((label, index) => {
              const percentages = ratingThresholds.map((threshold) => Math.round(threshold * 100));
              const minimum = index === 0 ? 1 : (percentages[index - 1] ?? 0) + 1;
              const maximum =
                index === percentages.length - 1 ? 99 : (percentages[index + 1] ?? 100) - 1;
              return (
                <label key={label} className="grid gap-1.5 text-xs font-medium text-foreground">
                  {label}
                  <span className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={minimum}
                      max={maximum}
                      step={1}
                      value={percentages[index]}
                      onChange={(event) => updateRatingThreshold(index, event.target.value)}
                      aria-label={label + " percentage"}
                    />
                    <span className="text-muted-foreground">%</span>
                  </span>
                  <span className="font-normal text-muted-foreground">
                    {index === 0
                      ? "0–" + percentages[index] + "%"
                      : percentages[index - 1] + "–" + percentages[index] + "%"}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground">
          Missing values use a neutral token rather than ruby. Every rating also carries a number
          and label, so color is never the only signal.
        </p>
      </Specimen>

      <Specimen
        name="Chart series"
        description="Categorical chart colors stay independent from rating rank and system status."
      >
        <figure>
          <figcaption className="sr-only">
            Sample bar chart: series values are 45, 72, 58, 88, and 64 percent.
          </figcaption>
          <div
            className="flex h-48 items-end gap-3 rounded-surface bg-muted p-5"
            aria-hidden="true"
          >
            {[
              { label: "Series 1", value: "45%", className: "bg-chart-1" },
              { label: "Series 2", value: "72%", className: "bg-chart-2" },
              { label: "Series 3", value: "58%", className: "bg-chart-3" },
              { label: "Series 4", value: "88%", className: "bg-chart-4" },
              { label: "Series 5", value: "64%", className: "bg-chart-5" },
            ].map((series) => (
              <div key={series.label} className="grid h-full flex-1 items-end gap-2">
                <i
                  className={`block w-full rounded-control ${series.className}`}
                  style={{ height: series.value }}
                />
                <span className="truncate text-center text-[0.625rem] text-muted-foreground">
                  {series.label}
                </span>
              </div>
            ))}
          </div>
        </figure>
      </Specimen>

      <Specimen
        name="Typography"
        description="Switch font sets in the left rail. Components consume display, body, and mono roles."
      >
        <div className="grid gap-5 desktop:grid-cols-[1fr_18rem]">
          <div className="rounded-surface bg-muted p-5">
            <p
              className="font-display text-4xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-display-family)" }}
            >
              The shape of an idea
            </p>
            <p
              className="mt-4 max-w-[65ch] font-body text-base leading-7 text-muted-foreground"
              style={{ fontFamily: "var(--font-body-family)" }}
            >
              Good typography gives a system rhythm before decoration begins. Display text
              establishes identity, body text carries meaning comfortably, and monospaced text
              separates technical material from ordinary prose.
            </p>
            <p
              className="mt-4 font-mono text-xs text-metadata"
              style={{ fontFamily: "var(--font-mono-family)" }}
            >
              rating.highest = amethyst;
            </p>
          </div>
          <div className="grid content-start gap-3 text-sm">
            {FONT_SETS.map((set) => (
              <button
                key={set.value}
                type="button"
                aria-pressed={theme.fontSet === set.value}
                onClick={() => theme.setFontSet(set.value)}
                className={`rounded-control border p-3 text-left transition-colors hover:border-primary/60 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring/50 ${theme.fontSet === set.value ? "border-primary bg-primary/10" : "border-border/40"}`}
              >
                <span className="block text-left font-semibold">{set.label}</span>
                <span className="mt-1 block text-left text-xs text-muted-foreground">
                  {set.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Specimen>

      <Specimen
        name="Radius"
        description="Roles keep controls, surfaces, and overlays coherent without component-specific values."
      >
        <div className="grid gap-3 tablet:grid-cols-2 desktop:grid-cols-4">
          {RADIUS_PRESETS.map((preset) => (
            <Card
              key={preset.value}
              className={theme.radius === preset.value ? "ring-2 ring-ring/50" : ""}
            >
              <CardHeader>
                <CardTitle>{preset.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  size="sm"
                  variant={theme.radius === preset.value ? "default" : "outline"}
                  onClick={() => theme.setRadius(preset.value)}
                >
                  Apply {preset.label.toLowerCase()}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Specimen>

      <Specimen
        name="Motion"
        description="A small semantic motion vocabulary with an explicit reduced-motion path."
      >
        <div className="grid gap-3 tablet:grid-cols-3">
          {MOTION_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => theme.setMotion(preset.value)}
              className={`group rounded-surface border p-5 text-left transition-colors ${theme.motion === preset.value ? "border-primary bg-primary/10" : "border-border/40 hover:bg-accent/15"}`}
            >
              <span className="flex items-center justify-between gap-2">
                <strong>{preset.label}</strong>
                {theme.motion === preset.value ? <Badge>Active</Badge> : null}
              </span>
              <i className="animate-demo-slide mt-5 block h-3 w-2/3 rounded-full bg-secondary" />
            </button>
          ))}
        </div>
      </Specimen>

      <Specimen
        name="Responsive breakpoints"
        description="Mobile-first base styles, then three memorable minimum-width capabilities."
      >
        <div className="grid gap-3 tablet:grid-cols-3">
          <div className="rounded-surface bg-muted p-5">
            <p className="text-xs font-semibold tracking-wider text-metadata uppercase">Tablet</p>
            <p className="mt-2 font-display text-2xl font-bold">48rem</p>
            <p className="mt-2 text-sm text-muted-foreground">
              768–1279px can remain one broad tablet layout range.
            </p>
          </div>
          <div className="rounded-surface bg-muted p-5">
            <p className="text-xs font-semibold tracking-wider text-metadata uppercase">Desktop</p>
            <p className="mt-2 font-display text-2xl font-bold">80rem</p>
            <p className="mt-2 text-sm text-muted-foreground">
              1280px and above enables the full application canvas.
            </p>
          </div>
          <div className="rounded-surface bg-muted p-5">
            <p className="text-xs font-semibold tracking-wider text-metadata uppercase">Wide</p>
            <p className="mt-2 font-display text-2xl font-bold">96rem</p>
            <p className="mt-2 text-sm text-muted-foreground">
              1536px and above adds breathing room, not required content.
            </p>
          </div>
        </div>
      </Specimen>
    </div>
  );
}

export { FoundationsPage };
