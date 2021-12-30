import assert from "node:assert";
import { IsomorphicEncoding } from "../../node/index.mjs";

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

  it("decode(*)", () => {

    assert.throws(() => {
      IsomorphicEncoding.decode([]);
    }, {
      name: "TypeError",
      message: "buffer",
    });

  });

});

describe("IsomorphicEncoding.encode", () => {
  it("encode()", () => {
    assert.strictEqual(JSON.stringify([...IsomorphicEncoding.encode()]), "[]");

  });

  it("encode(string)", () => {
    assert.strictEqual(JSON.stringify([...IsomorphicEncoding.encode("")]), "[]");
    assert.strictEqual(JSON.stringify([...IsomorphicEncoding.encode("ABCD")]), "[65,66,67,68]");
    assert.strictEqual(JSON.stringify([...IsomorphicEncoding.encode("\u0000\u00FF")]), "[0,255]");

    //const c = 12000000; もう1桁増やすと自環境では実行できない
    const c = 1200000;
    const t = "\u0000".repeat(c);
    const bf = performance.now();
    const rs = JSON.stringify([...IsomorphicEncoding.encode(t)]);
    console.log(performance.now() - bf);
    assert.strictEqual(rs, JSON.stringify([...new Uint8Array(c)]));

    assert.throws(() => {
      IsomorphicEncoding.encode("\u0100");
    }, {
      name: "TypeError",
      message: "input",
    });

  });

});
