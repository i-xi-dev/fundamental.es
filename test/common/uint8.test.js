import { expect } from '@esm-bundle/chai';
import { Uint8 } from "../../dist/index.js";

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
