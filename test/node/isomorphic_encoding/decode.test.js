import assert from "node:assert";
import { IsomorphicEncoding } from "../../../dist/index.js";

describe("IsomorphicEncoding.decode", () => {
  it("decode()", () => {
    assert.strictEqual(IsomorphicEncoding.decode(), "");

  });

  it("decode(ArrayBuffer)", () => {
    assert.strictEqual(IsomorphicEncoding.decode(new ArrayBuffer(0)), "");
    assert.strictEqual(IsomorphicEncoding.decode(Uint8Array.of(0x41,0x42,0x43,0x44).buffer), "ABCD");

  });

  it("decode(Uint8Array)", () => {
    assert.strictEqual(IsomorphicEncoding.decode(Uint8Array.of()), "");
    assert.strictEqual(IsomorphicEncoding.decode(Uint8Array.of(0x41,0x42,0x43,0x44)), "ABCD");
    assert.strictEqual(IsomorphicEncoding.decode(Uint8Array.of(0x0,0xFF)), "\u0000\u00FF");

    //const c = 120000000;
    const c = 1200000;
    const t = "\u0000".repeat(c);
    const bf = performance.now();
    assert.strictEqual(IsomorphicEncoding.decode(new Uint8Array(c)), t);
    console.log(performance.now() - bf);

  });

});
