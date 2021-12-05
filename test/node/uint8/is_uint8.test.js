import assert from "node:assert";
import { Uint8 } from "../../../dist/index.js";

describe("isUint8", () => {
  it("isUint8(number)", () => {
    assert.strictEqual(Uint8.isUint8(-1), false);
    assert.strictEqual(Uint8.isUint8(-0), true);
    assert.strictEqual(Uint8.isUint8(0), true);
    assert.strictEqual(Uint8.isUint8(255), true);
    assert.strictEqual(Uint8.isUint8(256), false);
    assert.strictEqual(Uint8.isUint8(0.1), false);
  });

  it("isUint8(any)", () => {
    assert.strictEqual(Uint8.isUint8("0"), false);
    assert.strictEqual(Uint8.isUint8("255"), false);
    assert.strictEqual(Uint8.isUint8(true), false);
    assert.strictEqual(Uint8.isUint8({}), false);
    assert.strictEqual(Uint8.isUint8([]), false);
    assert.strictEqual(Uint8.isUint8([0]), false);
    assert.strictEqual(Uint8.isUint8(), false);
    assert.strictEqual(Uint8.isUint8(null), false);
  });

});
