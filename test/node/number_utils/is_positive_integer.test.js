import assert from "node:assert";
import { NumberUtils } from "../../../dist/index.js";

describe("NumberUtils.isPositiveInteger", () => {
  it("isPositiveInteger(number)", () => {
    assert.strictEqual(NumberUtils.isPositiveInteger(-1), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(-0), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(0), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(1), true);
    assert.strictEqual(NumberUtils.isPositiveInteger(Number.MAX_SAFE_INTEGER), true);

    assert.strictEqual(NumberUtils.isPositiveInteger(1.1), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(Number.NaN), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(Number.POSITIVE_INFINITY), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(Number.NEGATIVE_INFINITY), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(Number.MIN_SAFE_INTEGER), false);

  });

  it("isPositiveInteger(*)", () => {
    assert.strictEqual(NumberUtils.isPositiveInteger("1"), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(true), false);
  });

});
