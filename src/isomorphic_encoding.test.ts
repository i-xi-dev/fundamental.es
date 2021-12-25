import { performance } from "node:perf_hooks"; // globalThisがnodeのと違うのでimportしないと使えない
import { IsomorphicEncoding } from "./isomorphic_encoding";

describe("IsomorphicEncoding.decode", () => {
  it("decode()", () => {
    expect(IsomorphicEncoding.decode()).toBe("");

  });

  it("decode(ArrayBuffer)", () => {
    expect(IsomorphicEncoding.decode(new ArrayBuffer(0))).toBe("");
    expect(IsomorphicEncoding.decode(Uint8Array.of(0x41,0x42,0x43,0x44).buffer)).toBe("ABCD");

  });

  it("decode(Uint8Array)", () => {
    expect(IsomorphicEncoding.decode(Uint8Array.of())).toBe("");
    expect(IsomorphicEncoding.decode(Uint8Array.of(0x41,0x42,0x43,0x44))).toBe("ABCD");
    expect(IsomorphicEncoding.decode(Uint8Array.of(0x0,0xFF))).toBe("\u0000\u00FF");

    //const c = 120000000;
    const c = 1200000;
    const t = "\u0000".repeat(c);
    const bf = performance.now();
    expect(IsomorphicEncoding.decode(new Uint8Array(c))).toBe(t);
    console.log(performance.now() - bf);

  });

  it("decode(*)", () => {

    expect(() => {
      IsomorphicEncoding.decode([] as unknown as Uint8Array);
    }).toThrowError({
      name: "TypeError",
      message: "buffer",
    });

  });

});

describe("IsomorphicEncoding.encode", () => {
  it("encode()", () => {
    expect(JSON.stringify([...IsomorphicEncoding.encode()])).toBe("[]");

  });

  it("encode(string)", () => {
    expect(JSON.stringify([...IsomorphicEncoding.encode("")])).toBe("[]");
    expect(JSON.stringify([...IsomorphicEncoding.encode("ABCD")])).toBe("[65,66,67,68]");
    expect(JSON.stringify([...IsomorphicEncoding.encode("\u0000\u00FF")])).toBe("[0,255]");

    //const c = 12000000; もう1桁増やすと自環境では実行できない
    const c = 1200000;
    const t = "\u0000".repeat(c);
    const bf = performance.now();
    const rs = JSON.stringify([...IsomorphicEncoding.encode(t)]);
    console.log(performance.now() - bf);
    expect(rs).toBe(JSON.stringify([...new Uint8Array(c)]));

    expect(() => {
      IsomorphicEncoding.encode("\u0100");
    }).toThrowError({
      name: "TypeError",
      message: "input",
    });

  });

});
