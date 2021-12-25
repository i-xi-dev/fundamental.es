import { NumberUtils } from "./number_utils";

describe("NumberUtils.isNonNegativeInteger", () => {
  it("isNonNegativeInteger(number)", () => {
    expect(NumberUtils.isNonNegativeInteger(-1)).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(-0)).toBe(true);
    expect(NumberUtils.isNonNegativeInteger(0)).toBe(true);
    expect(NumberUtils.isNonNegativeInteger(1)).toBe(true);
    expect(NumberUtils.isNonNegativeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);

    expect(NumberUtils.isNonNegativeInteger(1.1)).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(Number.NaN)).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(Number.POSITIVE_INFINITY)).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(Number.NEGATIVE_INFINITY)).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(Number.MIN_SAFE_INTEGER)).toBe(false);

  });

  it("isNonNegativeInteger(*)", () => {
    expect(NumberUtils.isNonNegativeInteger("1")).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(true)).toBe(false);

  });

});

describe("NumberUtils.isPositiveInteger", () => {
  it("isPositiveInteger(number)", () => {
    expect(NumberUtils.isPositiveInteger(-1)).toBe(false);
    expect(NumberUtils.isPositiveInteger(-0)).toBe(false);
    expect(NumberUtils.isPositiveInteger(0)).toBe(false);
    expect(NumberUtils.isPositiveInteger(1)).toBe(true);
    expect(NumberUtils.isPositiveInteger(Number.MAX_SAFE_INTEGER)).toBe(true);

    expect(NumberUtils.isNonNegativeInteger(1.1)).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(Number.NaN)).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(Number.POSITIVE_INFINITY)).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(Number.NEGATIVE_INFINITY)).toBe(false);
    expect(NumberUtils.isNonNegativeInteger(Number.MIN_SAFE_INTEGER)).toBe(false);

  });

  it("isPositiveInteger(*)", () => {
    expect(NumberUtils.isPositiveInteger("1")).toBe(false);
    expect(NumberUtils.isPositiveInteger(true)).toBe(false);

  });

});
