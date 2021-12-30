import assert from "node:assert";
import { NumberUtils } from "../../node/index.mjs";

describe("NumberUtils.isNonNegativeInteger", () => {
  it("isNonNegativeInteger(number)", () => {
    assert.strictEqual(NumberUtils.isNonNegativeInteger(-1), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(-0), true);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(0), true);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(1), true);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(Number.MAX_SAFE_INTEGER), true);

    assert.strictEqual(NumberUtils.isNonNegativeInteger(1.1), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(Number.NaN), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(Number.POSITIVE_INFINITY), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(Number.NEGATIVE_INFINITY), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(Number.MIN_SAFE_INTEGER), false);

  });

  it("isNonNegativeInteger(*)", () => {
    assert.strictEqual(NumberUtils.isNonNegativeInteger("1"), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(true), false);

  });

});

describe("NumberUtils.isPositiveInteger", () => {
  it("isPositiveInteger(number)", () => {
    assert.strictEqual(NumberUtils.isPositiveInteger(-1), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(-0), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(0), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(1), true);
    assert.strictEqual(NumberUtils.isPositiveInteger(Number.MAX_SAFE_INTEGER), true);

    assert.strictEqual(NumberUtils.isNonNegativeInteger(1.1), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(Number.NaN), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(Number.POSITIVE_INFINITY), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(Number.NEGATIVE_INFINITY), false);
    assert.strictEqual(NumberUtils.isNonNegativeInteger(Number.MIN_SAFE_INTEGER), false);

  });

  it("isPositiveInteger(*)", () => {
    assert.strictEqual(NumberUtils.isPositiveInteger("1"), false);
    assert.strictEqual(NumberUtils.isPositiveInteger(true), false);

  });

});
