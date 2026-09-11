import {
  DEFAULT_RATING_THRESHOLDS,
  RATING_SCALE,
  ratingFromScore,
  type RatingThresholds,
} from "@/src/foundation/rating-scale";
import { Badge } from "@/src/ui/react";
import { cn } from "@/src/utils";
import * as React from "react";

const ratingBackgrounds = {
  lowest: "bg-rating-lowest",
  low: "bg-rating-low",
  middle: "bg-rating-middle",
  high: "bg-rating-high",
  highest: "bg-rating-highest",
} as const;

const ratingTokens = {
  lowest: "var(--rating-lowest)",
  low: "var(--rating-low)",
  middle: "var(--rating-middle)",
  high: "var(--rating-high)",
  highest: "var(--rating-highest)",
} as const;

type RatingMeterProps = {
  score: number | null;
  className?: string;
  minimum?: number;
  maximum?: number;
  thresholds?: RatingThresholds;
};

function RatingMeter({
  score,
  className,
  minimum = 0,
  maximum = 100,
  thresholds = DEFAULT_RATING_THRESHOLDS,
}: RatingMeterProps) {
  const rating = score == null ? null : ratingFromScore(score, { minimum, maximum, thresholds });
  const normalizedScore =
    score == null || maximum <= minimum
      ? 0
      : Math.min(1, Math.max(0, (score - minimum) / (maximum - minimum)));

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Preference rating</p>
          <p className="mt-1 font-display text-3xl font-bold text-foreground">
            {score == null ? "—" : score}
            <span className="ml-1 text-sm font-normal text-muted-foreground">/ 100</span>
          </p>
        </div>
        {rating ? (
          <Badge className={cn(ratingBackgrounds[rating.name], "text-rating-foreground")}>
            {rating.label}
          </Badge>
        ) : (
          <Badge variant="subtle">Not rated</Badge>
        )}
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-track">
        {score != null && (
          <div
            className="rating-fill duration-normal absolute inset-y-0 left-0 rounded-full transition-[width] ease-standard"
            style={
              {
                width: `${normalizedScore * 100}%`,
                "--rating-fill": rating ? ratingTokens[rating.name] : "var(--track)",
              } as React.CSSProperties
            }
          />
        )}
        {thresholds.map((threshold) => (
          <i
            key={threshold}
            className="absolute inset-y-0 w-px bg-foreground/20"
            style={{ left: `${threshold * 100}%` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="sr-only">
        Preference score: {score == null ? "not rated" : `${score} out of 100, ${rating?.label}`}
      </span>
      <ol className="grid grid-cols-5 gap-1 text-center text-[0.625rem] text-muted-foreground">
        {RATING_SCALE.map((entry) => (
          <li key={entry.level}>
            <i
              className={cn(
                "mx-auto mb-1 block size-2 rounded-full",
                ratingBackgrounds[entry.name],
              )}
            />
            {entry.label}
          </li>
        ))}
      </ol>
    </div>
  );
}

export { RatingMeter };
