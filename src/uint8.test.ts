import { expect } from '@esm-bundle/chai';
import { isUint8 } from "./uint8";

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
