import { expect } from '@esm-bundle/chai';
import { Integer } from "../../dist/index.js";
const { isNonNegativeInteger, isPositiveInteger, inRange } = Integer;

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

describe("inRange", () => {
  it("inRange(number,[number,number])", () => {
    expect(inRange(1, [1, 1])).to.equal(true);
    expect(inRange(1, [0, 1])).to.equal(true);
    expect(inRange(1, [1, 2])).to.equal(true);
    expect(inRange(1, [-1, 0])).to.equal(false);
    expect(inRange(1, [2, 3])).to.equal(false);
    expect(inRange(1, [0, 2])).to.equal(true);

    expect(() => {
      inRange("");
    }).to.throw(TypeError, "value").with.property("name", "TypeError");

    expect(() => {
      inRange(1, ["", 1]);
    }).to.throw(TypeError, "minmax").with.property("name", "TypeError");

    expect(() => {
      inRange(1, [1, ""]);
    }).to.throw(TypeError, "minmax").with.property("name", "TypeError");

    expect(() => {
      inRange(1, []);
    }).to.throw(TypeError, "minmax").with.property("name", "TypeError");

    expect(() => {
      inRange(1, [3, 2]);
    }).to.throw(RangeError, "minmax").with.property("name", "RangeError");

  });

});
