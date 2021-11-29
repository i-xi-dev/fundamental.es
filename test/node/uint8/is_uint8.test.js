import assert from "node:assert";
import { isUint8 } from "../../../dist/index.js";

describe("isUint8", () => {
  it("isUint8(number)", () => {
    assert.strictEqual(isUint8(-1), false);
    assert.strictEqual(isUint8(-0), true);
    assert.strictEqual(isUint8(0), true);
    assert.strictEqual(isUint8(255), true);
    assert.strictEqual(isUint8(256), false);
    assert.strictEqual(isUint8(0.1), false);
  });

  it("isUint8(any)", () => {
    assert.strictEqual(isUint8("0"), false);
    assert.strictEqual(isUint8("255"), false);
    assert.strictEqual(isUint8(true), false);
    assert.strictEqual(isUint8({}), false);
    assert.strictEqual(isUint8([]), false);
    assert.strictEqual(isUint8([0]), false);
    assert.strictEqual(isUint8(), false);
    assert.strictEqual(isUint8(null), false);
  });

});
