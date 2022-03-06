import { expect } from '@esm-bundle/chai';
import { isUint8, isArrayOfUint8 } from "../../dist/index.js";

describe("isUint8", () => {
  it("isUint8(number)", () => {
    expect(isUint8(-1)).to.equal(false);
    expect(isUint8(-0)).to.equal(true);
    expect(isUint8(0)).to.equal(true);
    expect(isUint8(255)).to.equal(true);
    expect(isUint8(256)).to.equal(false);
    expect(isUint8(0.1)).to.equal(false);

  });

  it("isUint8(any)", () => {
    expect(isUint8("0")).to.equal(false);
    expect(isUint8("255")).to.equal(false);
    expect(isUint8(true)).to.equal(false);
    expect(isUint8({})).to.equal(false);
    expect(isUint8([])).to.equal(false);
    expect(isUint8([0])).to.equal(false);
    expect(isUint8(undefined)).to.equal(false);
    expect(isUint8(null)).to.equal(false);

  });

});

describe("isArrayOfUint8", () => {
  it("isArrayOfUint8(number[])", () => {
    expect(isArrayOfUint8([])).to.equal(true);
    expect(isArrayOfUint8([-1])).to.equal(false);
    expect(isArrayOfUint8([0])).to.equal(true);
    expect(isArrayOfUint8([255])).to.equal(true);
    expect(isArrayOfUint8([256])).to.equal(false);
    expect(isArrayOfUint8([-2,-1])).to.equal(false);
    expect(isArrayOfUint8([-1,0])).to.equal(false);
    expect(isArrayOfUint8([0,1])).to.equal(true);
    expect(isArrayOfUint8([254,255])).to.equal(true);
    expect(isArrayOfUint8([255,256])).to.equal(false);
    expect(isArrayOfUint8([256,257])).to.equal(false);

    expect(isArrayOfUint8([1, 0.1])).to.equal(false);

  });

  it("isArrayOfUint8(any)", () => {
    expect(isArrayOfUint8(["0"])).to.equal(false);
    expect(isArrayOfUint8({})).to.equal(false);
    expect(isArrayOfUint8(null)).to.equal(false);

  });

});
