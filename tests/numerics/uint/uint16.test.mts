import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Uint16.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint16.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint16.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint16.MAX_VALUE, 0xFFFF);
});

Deno.test("Numerics.Uint16.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint16.BIT_LENGTH, 16);
});

Deno.test("Numerics.Uint16.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint16.BYTE_LENGTH, 2);
});

Deno.test("Numerics.Uint16[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint16.toString(), "[object Uint16]");
});

const le = "little-endian";
const be = "big-endian";

function testFromBytes(
  bytes: Array<number>,
  order?: "little-endian" | "big-endian",
): number {
  return Numerics.Uint16.fromBytes(Uint8Array.of(...bytes), order);
}

Deno.test("Numerics.Uint16.fromBytes()", () => {
  assertStrictEquals(testFromBytes([0, 0]), 0);
  assertStrictEquals(testFromBytes([0, 0], be), 0);
  assertStrictEquals(testFromBytes([0, 0], le), 0);

  assertStrictEquals(testFromBytes([0, 0x3F], be), 0x3F);
  assertStrictEquals(testFromBytes([0x3F, 0], le), 0x3F);

  assertStrictEquals(testFromBytes([0, 0x7F], be), 0x7F);
  assertStrictEquals(testFromBytes([0x7F, 0], le), 0x7F);

  assertStrictEquals(testFromBytes([0, 0xFF], be), 0xFF);
  assertStrictEquals(testFromBytes([0xFF, 0], le), 0xFF);

  assertStrictEquals(testFromBytes([0xFF, 0xFF]), 0xFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF], be), 0xFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF], le), 0xFFFF);

  assertStrictEquals(testFromBytes([13, 101], be), 3429);
  assertStrictEquals(testFromBytes([101, 13], le), 3429);
});

Deno.test("Numerics.Uint16.fromBytes() - error", () => {
  assertThrows(
    () => {
      Numerics.Uint16.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      testFromBytes([0]);
    },
    RangeError,
    "The length of input must be 2",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0, 0]);
    },
    RangeError,
    "The length of input must be 2",
  );
});
