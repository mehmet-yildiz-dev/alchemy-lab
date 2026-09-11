import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_RATING_THRESHOLDS, RATING_SCALE, ratingFromScore } from "./rating-scale";

test("preserves the Digital Alchemy low-to-high rating order", () => {
  assert.deepEqual(
    RATING_SCALE.map(({ material }) => material),
    ["ruby", "topaz", "emerald", "sapphire", "amethyst"],
  );
});

test("maps scores into the weighted default bands", () => {
  assert.equal(ratingFromScore(0)?.name, "lowest");
  assert.equal(ratingFromScore(29)?.name, "lowest");
  assert.equal(ratingFromScore(30)?.name, "low");
  assert.equal(ratingFromScore(50)?.name, "middle");
  assert.equal(ratingFromScore(70)?.name, "high");
  assert.equal(ratingFromScore(90)?.name, "highest");
  assert.equal(ratingFromScore(100)?.name, "highest");
});

test("accepts custom transition points for project-specific scales", () => {
  assert.equal(ratingFromScore(45, { thresholds: [0.2, 0.4, 0.6, 0.8] })?.name, "middle");
  assert.throws(() => ratingFromScore(50, { thresholds: [0.2, 0.2, 0.6, 0.8] }), RangeError);
  assert.deepEqual(DEFAULT_RATING_THRESHOLDS, [0.3, 0.5, 0.7, 0.9]);
});

test("clamps known scores and treats invalid scores as unavailable", () => {
  assert.equal(ratingFromScore(-10)?.name, "lowest");
  assert.equal(ratingFromScore(200)?.name, "highest");
  assert.equal(ratingFromScore(Number.NaN), null);
});
