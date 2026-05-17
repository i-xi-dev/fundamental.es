import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Uint8.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint8.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint8.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint8.MAX_VALUE, 0xFF);
});

Deno.test("Numerics.Uint8.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint8.BIT_LENGTH, 8);
});

Deno.test("Numerics.Uint8.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint8.BYTE_LENGTH, 1);
});

Deno.test("Numerics.Uint8[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint8.toString(), "[object Uint8]");
});

const le = "little-endian";
const be = "big-endian";

function testFromBytes(
  bytes: Array<number>,
  order?: "little-endian" | "big-endian",
): number {
  return Numerics.Uint8.fromBytes(Uint8Array.of(...bytes), order);
}

Deno.test("Numerics.Uint8.fromBytes()", () => {
  assertStrictEquals(testFromBytes([0]), 0);
  assertStrictEquals(testFromBytes([0], be), 0);
  assertStrictEquals(testFromBytes([0], le), 0);

  assertStrictEquals(testFromBytes([0x3F]), 0x3F);
  assertStrictEquals(testFromBytes([0x3F], be), 0x3F);
  assertStrictEquals(testFromBytes([0x3F], le), 0x3F);

  assertStrictEquals(testFromBytes([0x7F]), 0x7F);
  assertStrictEquals(testFromBytes([0x7F], be), 0x7F);
  assertStrictEquals(testFromBytes([0x7F], le), 0x7F);

  assertStrictEquals(testFromBytes([0xFF]), 0xFF);
  assertStrictEquals(testFromBytes([0xFF], be), 0xFF);
  assertStrictEquals(testFromBytes([0xFF], le), 0xFF);
});

Deno.test("Numerics.Uint8.fromBytes() - error", () => {
  assertThrows(
    () => {
      Numerics.Uint8.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      testFromBytes([]);
    },
    RangeError,
    "The length of input must be 1",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0]);
    },
    RangeError,
    "The length of input must be 1",
  );
});
