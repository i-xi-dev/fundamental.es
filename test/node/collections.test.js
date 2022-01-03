import assert from "node:assert";
import { SizedMap } from "../../dist/index.js";

describe("SizedMap", () => {
  it("SizedMap(number)", () => {

    assert.throws(() => {
      new SizedMap(-1);
    }, {
      name: "TypeError",
      message: "maxSize",
    });

    assert.throws(() => {
      new SizedMap(0);
    }, {
      name: "TypeError",
      message: "maxSize",
    });

    assert.throws(() => {
      new SizedMap(Number.MAX_VALUE);
    }, {
      name: "TypeError",
      message: "maxSize",
    });

    const m1 = new SizedMap(Number.MAX_SAFE_INTEGER);
    assert.strictEqual(m1.size, 0);

  });

});

describe("SizedMap.set", () => {
  it("set(K, V)", () => {
    const m1 = new SizedMap(1);
    assert.strictEqual(m1.size, 0);
    m1.set("k1", "v1");
    assert.strictEqual(m1.size, 1);
    assert.strictEqual(JSON.stringify([...m1.entries()]), `[["k1","v1"]]`);
    m1.set("k2", "v2");
    assert.strictEqual(m1.size, 1);
    assert.strictEqual(JSON.stringify([...m1.entries()]), `[["k2","v2"]]`);

    const m2 = new SizedMap(2);
    assert.strictEqual(m2.size, 0);
    m2.set("k1", "v1");
    assert.strictEqual(m2.size, 1);
    assert.strictEqual(JSON.stringify([...m2.entries()]), `[["k1","v1"]]`);
    m2.set("k2", "v2");
    assert.strictEqual(m2.size, 2);
    assert.strictEqual(JSON.stringify([...m2.entries()]), `[["k1","v1"],["k2","v2"]]`);
    m2.set("k3", "v3");
    assert.strictEqual(m2.size, 2);
    assert.strictEqual(JSON.stringify([...m2.entries()]), `[["k2","v2"],["k3","v3"]]`);

  });

});
