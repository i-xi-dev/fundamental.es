import { Uint8 } from "./uint8";

describe("Uint8.isUint8", () => {
  it("isUint8(number)", () => {
    expect(Uint8.isUint8(-1)).toBe(false);
    expect(Uint8.isUint8(-0)).toBe(true);
    expect(Uint8.isUint8(0)).toBe(true);
    expect(Uint8.isUint8(255)).toBe(true);
    expect(Uint8.isUint8(256)).toBe(false);
    expect(Uint8.isUint8(0.1)).toBe(false);

  });

  it("isUint8(any)", () => {
    expect(Uint8.isUint8("0")).toBe(false);
    expect(Uint8.isUint8("255")).toBe(false);
    expect(Uint8.isUint8(true)).toBe(false);
    expect(Uint8.isUint8({})).toBe(false);
    expect(Uint8.isUint8([])).toBe(false);
    expect(Uint8.isUint8([0])).toBe(false);
    expect(Uint8.isUint8(undefined)).toBe(false);
    expect(Uint8.isUint8(null)).toBe(false);
  });

});
