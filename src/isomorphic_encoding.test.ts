import { expect } from '@esm-bundle/chai';
import { IsomorphicEncoding } from "./isomorphic_encoding";

describe("IsomorphicEncoding.decode", () => {
  it("decode()", () => {
    expect(IsomorphicEncoding.decode()).to.equal("");

  });

  it("decode(ArrayBuffer)", () => {
    expect(IsomorphicEncoding.decode(new ArrayBuffer(0))).to.equal("");
    expect(IsomorphicEncoding.decode(Uint8Array.of(0x41,0x42,0x43,0x44).buffer)).to.equal("ABCD");

  });

  it("decode(Uint8Array)", () => {
    expect(IsomorphicEncoding.decode(Uint8Array.of())).to.equal("");
    expect(IsomorphicEncoding.decode(Uint8Array.of(0x41,0x42,0x43,0x44))).to.equal("ABCD");
    expect(IsomorphicEncoding.decode(Uint8Array.of(0x0,0xFF))).to.equal("\u0000\u00FF");

    //const c = 120000000;
    const c = 1200000;
    const t = "\u0000".repeat(c);
    const bf = performance.now();
    expect(IsomorphicEncoding.decode(new Uint8Array(c))).to.equal(t);
    console.log(performance.now() - bf);

  });

  it("decode(*)", () => {

    expect(() => {
      IsomorphicEncoding.decode([] as unknown as Uint8Array);
    }).to.throw(TypeError, "buffer").with.property("name", "TypeError");

  });

});

describe("IsomorphicEncoding.encode", () => {
  it("encode()", () => {
    expect(JSON.stringify([...IsomorphicEncoding.encode()])).to.equal("[]");

  });

  it("encode(string)", () => {
    expect(JSON.stringify([...IsomorphicEncoding.encode("")])).to.equal("[]");
    expect(JSON.stringify([...IsomorphicEncoding.encode("ABCD")])).to.equal("[65,66,67,68]");
    expect(JSON.stringify([...IsomorphicEncoding.encode("\u0000\u00FF")])).to.equal("[0,255]");

    //const c = 12000000; もう1桁増やすと自環境では実行できない
    const c = 1200000;
    const t = "\u0000".repeat(c);
    const bf = performance.now();
    const rs = JSON.stringify([...IsomorphicEncoding.encode(t)]);
    console.log(performance.now() - bf);
    expect(rs).to.equal(JSON.stringify([...new Uint8Array(c)]));

    expect(() => {
      IsomorphicEncoding.encode("\u0100");
    }).to.throw(TypeError, "input").with.property("name", "TypeError");

  });

});
