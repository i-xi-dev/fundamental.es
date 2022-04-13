import { expect } from '@esm-bundle/chai';
import { Uint8, Uint8Utils } from "./uint8";

describe("Uint8.isUint8", () => {
  it("isUint8(number)", () => {
    expect(Uint8.isUint8(-1)).to.equal(false);
    expect(Uint8.isUint8(-0)).to.equal(true);
    expect(Uint8.isUint8(0)).to.equal(true);
    expect(Uint8.isUint8(255)).to.equal(true);
    expect(Uint8.isUint8(256)).to.equal(false);
    expect(Uint8.isUint8(0.1)).to.equal(false);

  });

  it("isUint8(any)", () => {
    expect(Uint8.isUint8("0")).to.equal(false);
    expect(Uint8.isUint8("255")).to.equal(false);
    expect(Uint8.isUint8(true)).to.equal(false);
    expect(Uint8.isUint8({})).to.equal(false);
    expect(Uint8.isUint8([])).to.equal(false);
    expect(Uint8.isUint8([0])).to.equal(false);
    expect(Uint8.isUint8(undefined)).to.equal(false);
    expect(Uint8.isUint8(null)).to.equal(false);

  });

});

describe("Uint8Utils.isArrayOfUint8", () => {
  it("isArrayOfUint8(number[])", () => {
    expect(Uint8Utils.isArrayOfUint8([])).to.equal(true);
    expect(Uint8Utils.isArrayOfUint8([-1])).to.equal(false);
    expect(Uint8Utils.isArrayOfUint8([0])).to.equal(true);
    expect(Uint8Utils.isArrayOfUint8([255])).to.equal(true);
    expect(Uint8Utils.isArrayOfUint8([256])).to.equal(false);
    expect(Uint8Utils.isArrayOfUint8([-2,-1])).to.equal(false);
    expect(Uint8Utils.isArrayOfUint8([-1,0])).to.equal(false);
    expect(Uint8Utils.isArrayOfUint8([0,1])).to.equal(true);
    expect(Uint8Utils.isArrayOfUint8([254,255])).to.equal(true);
    expect(Uint8Utils.isArrayOfUint8([255,256])).to.equal(false);
    expect(Uint8Utils.isArrayOfUint8([256,257])).to.equal(false);

    expect(Uint8Utils.isArrayOfUint8([1, 0.1])).to.equal(false);

  });

  it("isArrayOfUint8(any)", () => {
    expect(Uint8Utils.isArrayOfUint8(["0"])).to.equal(false);
    expect(Uint8Utils.isArrayOfUint8({})).to.equal(false);
    expect(Uint8Utils.isArrayOfUint8(null)).to.equal(false);

  });

});
