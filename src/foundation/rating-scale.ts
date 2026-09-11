export const RATING_SCALE = [
  { level: 1, name: "lowest", label: "Lowest", material: "ruby" },
  { level: 2, name: "low", label: "Low", material: "topaz" },
  { level: 3, name: "middle", label: "Middle", material: "emerald" },
  { level: 4, name: "high", label: "High", material: "sapphire" },
  { level: 5, name: "highest", label: "Highest", material: "amethyst" },
] as const;

export type RatingLevel = (typeof RATING_SCALE)[number]["level"];
export type RatingName = (typeof RATING_SCALE)[number]["name"];
export type RatingMaterial = (typeof RATING_SCALE)[number]["material"];
export type RatingEntry = (typeof RATING_SCALE)[number];

export type RatingResult = RatingEntry & {
  token: `var(--rating-${RatingName})`;
};

/**
 * The four transition points between the five rating bands, expressed as a normalized fraction of
 * the score range. The default gives the lowest band 30% of the scale, the highest band 10%, and
 * divides the remaining space evenly between the middle bands.
 */
export type RatingThresholds = readonly [number, number, number, number];

export const DEFAULT_RATING_THRESHOLDS: RatingThresholds = [0.3, 0.5, 0.7, 0.9];

function assertRatingThresholds(
  thresholds: readonly number[],
): asserts thresholds is RatingThresholds {
  if (
    thresholds.length !== 4 ||
    thresholds.some((value) => !Number.isFinite(value) || value <= 0 || value >= 1) ||
    thresholds.some((value, index) => index > 0 && value <= (thresholds[index - 1] ?? 0))
  ) {
    throw new RangeError(
      "Rating thresholds must contain four strictly increasing values between 0 and 1",
    );
  }
}

export function ratingFromLevel(level: RatingLevel): RatingResult {
  const entry = RATING_SCALE[level - 1] ?? RATING_SCALE[0];
  return { ...entry, token: `var(--rating-${entry.name})` };
}

export function ratingFromScore(
  score: number,
  {
    minimum = 0,
    maximum = 100,
    thresholds = DEFAULT_RATING_THRESHOLDS,
  }: { minimum?: number; maximum?: number; thresholds?: RatingThresholds } = {},
): RatingResult | null {
  if (!Number.isFinite(score) || !Number.isFinite(minimum) || !Number.isFinite(maximum))
    return null;
  if (maximum <= minimum) throw new RangeError("Rating maximum must be greater than minimum");
  assertRatingThresholds(thresholds);

  const normalized = Math.min(1, Math.max(0, (score - minimum) / (maximum - minimum)));
  const level = (thresholds.findIndex((threshold) => normalized < threshold) + 1 ||
    5) as RatingLevel;
  return ratingFromLevel(level);
}
