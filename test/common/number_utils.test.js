import { expect } from '@esm-bundle/chai';
import { NumberUtils } from "../../dist/index.js";

describe("NumberUtils.isNonNegativeInteger", () => {
  it("isNonNegativeInteger(number)", () => {
    expect(NumberUtils.isNonNegativeInteger(-1)).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(-0)).to.equal(true);
    expect(NumberUtils.isNonNegativeInteger(0)).to.equal(true);
    expect(NumberUtils.isNonNegativeInteger(1)).to.equal(true);
    expect(NumberUtils.isNonNegativeInteger(Number.MAX_SAFE_INTEGER)).to.equal(true);

    expect(NumberUtils.isNonNegativeInteger(1.1)).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(Number.NaN)).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(Number.POSITIVE_INFINITY)).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(Number.NEGATIVE_INFINITY)).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(Number.MIN_SAFE_INTEGER)).to.equal(false);

  });

  it("isNonNegativeInteger(*)", () => {
    expect(NumberUtils.isNonNegativeInteger("1")).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(true)).to.equal(false);

  });

});

describe("NumberUtils.isPositiveInteger", () => {
  it("isPositiveInteger(number)", () => {
    expect(NumberUtils.isPositiveInteger(-1)).to.equal(false);
    expect(NumberUtils.isPositiveInteger(-0)).to.equal(false);
    expect(NumberUtils.isPositiveInteger(0)).to.equal(false);
    expect(NumberUtils.isPositiveInteger(1)).to.equal(true);
    expect(NumberUtils.isPositiveInteger(Number.MAX_SAFE_INTEGER)).to.equal(true);

    expect(NumberUtils.isNonNegativeInteger(1.1)).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(Number.NaN)).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(Number.POSITIVE_INFINITY)).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(Number.NEGATIVE_INFINITY)).to.equal(false);
    expect(NumberUtils.isNonNegativeInteger(Number.MIN_SAFE_INTEGER)).to.equal(false);

  });

  it("isPositiveInteger(*)", () => {
    expect(NumberUtils.isPositiveInteger("1")).to.equal(false);
    expect(NumberUtils.isPositiveInteger(true)).to.equal(false);

  });

});
