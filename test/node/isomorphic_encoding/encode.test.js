import assert from "node:assert";
import { IsomorphicEncoding } from "../../../dist/index.js";

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

  });

});
