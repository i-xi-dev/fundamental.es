import { expect } from '@esm-bundle/chai';
import { SizedMap } from "../../dist/index.js";

describe("SizedMap", () => {
  it("SizedMap(number)", () => {

    expect(() => {
      new SizedMap(-1);
    }).to.throw(TypeError, "maxSize").with.property("name", "TypeError");

    expect(() => {
      new SizedMap(0);
    }).to.throw(TypeError, "maxSize").with.property("name", "TypeError");

    expect(() => {
      new SizedMap(Number.MAX_VALUE);
    }).to.throw(TypeError, "maxSize").with.property("name", "TypeError");

    const m1 = new SizedMap(Number.MAX_SAFE_INTEGER);
    expect(m1.size).to.equal(0);

  });

});

describe("SizedMap.set", () => {
  it("set(K, V)", () => {
    const m1 = new SizedMap(1);
    expect(m1.size).to.equal(0);
    m1.set("k1", "v1");
    expect(m1.size).to.equal(1);
    expect(JSON.stringify([...m1.entries()])).to.equal(`[["k1","v1"]]`);
    m1.set("k2", "v2");
    expect(m1.size).to.equal(1);
    expect(JSON.stringify([...m1.entries()])).to.equal(`[["k2","v2"]]`);

    const m2 = new SizedMap(2);
    expect(m2.size).to.equal(0);
    m2.set("k1", "v1");
    expect(m2.size).to.equal(1);
    expect(JSON.stringify([...m2.entries()])).to.equal(`[["k1","v1"]]`);
    m2.set("k2", "v2");
    expect(m2.size).to.equal(2);
    expect(JSON.stringify([...m2.entries()])).to.equal(`[["k1","v1"],["k2","v2"]]`);
    m2.set("k3", "v3");
    expect(m2.size).to.equal(2);
    expect(JSON.stringify([...m2.entries()])).to.equal(`[["k2","v2"],["k3","v3"]]`);

  });

});
