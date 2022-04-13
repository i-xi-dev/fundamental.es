import { expect } from '@esm-bundle/chai';
import { isNonNegativeInteger, isPositiveInteger } from "../../dist/index.js";

describe("isNonNegativeInteger", () => {
  it("isNonNegativeInteger(number)", () => {
    expect(isNonNegativeInteger(-1)).to.equal(false);
    expect(isNonNegativeInteger(-0)).to.equal(true);
    expect(isNonNegativeInteger(0)).to.equal(true);
    expect(isNonNegativeInteger(1)).to.equal(true);
    expect(isNonNegativeInteger(Number.MAX_SAFE_INTEGER)).to.equal(true);

    expect(isNonNegativeInteger(1.1)).to.equal(false);
    expect(isNonNegativeInteger(Number.NaN)).to.equal(false);
    expect(isNonNegativeInteger(Number.POSITIVE_INFINITY)).to.equal(false);
    expect(isNonNegativeInteger(Number.NEGATIVE_INFINITY)).to.equal(false);
    expect(isNonNegativeInteger(Number.MIN_SAFE_INTEGER)).to.equal(false);

  });

  it("isNonNegativeInteger(*)", () => {
    expect(isNonNegativeInteger("1")).to.equal(false);
    expect(isNonNegativeInteger(true)).to.equal(false);

  });

});

describe("isPositiveInteger", () => {
  it("isPositiveInteger(number)", () => {
    expect(isPositiveInteger(-1)).to.equal(false);
    expect(isPositiveInteger(-0)).to.equal(false);
    expect(isPositiveInteger(0)).to.equal(false);
    expect(isPositiveInteger(1)).to.equal(true);
    expect(isPositiveInteger(Number.MAX_SAFE_INTEGER)).to.equal(true);

    expect(isNonNegativeInteger(1.1)).to.equal(false);
    expect(isNonNegativeInteger(Number.NaN)).to.equal(false);
    expect(isNonNegativeInteger(Number.POSITIVE_INFINITY)).to.equal(false);
    expect(isNonNegativeInteger(Number.NEGATIVE_INFINITY)).to.equal(false);
    expect(isNonNegativeInteger(Number.MIN_SAFE_INTEGER)).to.equal(false);

  });

  it("isPositiveInteger(*)", () => {
    expect(isPositiveInteger("1")).to.equal(false);
    expect(isPositiveInteger(true)).to.equal(false);

  });

});
