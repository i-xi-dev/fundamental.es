import { expect } from '@esm-bundle/chai';
import { isCodePoint } from "./code_point";

describe("isCodePoint", () => {
  it("isCodePoint(number)", () => {
    expect(isCodePoint(-1)).to.equal(false);
    expect(isCodePoint(-0)).to.equal(true);
    expect(isCodePoint(0)).to.equal(true);
    expect(isCodePoint(1_114_111)).to.equal(true);
    expect(isCodePoint(1_114_112)).to.equal(false);
    expect(isCodePoint(0.1)).to.equal(false);

  });

  it("isCodePoint(any)", () => {
    expect(isCodePoint("0")).to.equal(false);
    expect(isCodePoint("1114111")).to.equal(false);
    expect(isCodePoint(true)).to.equal(false);
    expect(isCodePoint({})).to.equal(false);
    expect(isCodePoint([])).to.equal(false);
    expect(isCodePoint([0])).to.equal(false);
    expect(isCodePoint(undefined)).to.equal(false);
    expect(isCodePoint(null)).to.equal(false);

  });

});
