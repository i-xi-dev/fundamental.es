import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Uint32.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint32.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint32.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint32.MAX_VALUE, 0xFFFF_FFFF);
});

Deno.test("Numerics.Uint32.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint32.BIT_LENGTH, 32);
});

Deno.test("Numerics.Uint32.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint32.BYTE_LENGTH, 4);
});

Deno.test("Numerics.Uint32[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint32.toString(), "[object Uint32]");
});

const le = "little-endian";
const be = "big-endian";

function testFromBytes(
  bytes: Array<number>,
  order?: "little-endian" | "big-endian",
): number {
  return Numerics.Uint32.fromBytes(Uint8Array.of(...bytes), order);
}

Deno.test("Numerics.Uint32.fromBytes()", () => {
  assertStrictEquals(testFromBytes([0, 0, 0, 0]), 0);
  assertStrictEquals(testFromBytes([0, 0, 0, 0], be), 0);
  assertStrictEquals(testFromBytes([0, 0, 0, 0], le), 0);

  assertStrictEquals(testFromBytes([0, 0, 0, 0x3F], be), 0x3F);
  assertStrictEquals(testFromBytes([0x3F, 0, 0, 0], le), 0x3F);

  assertStrictEquals(testFromBytes([0, 0, 0, 0x7F], be), 0x7F);
  assertStrictEquals(testFromBytes([0x7F, 0, 0, 0], le), 0x7F);

  assertStrictEquals(testFromBytes([0, 0, 0, 0xFF], be), 0xFF);
  assertStrictEquals(testFromBytes([0xFF, 0, 0, 0], le), 0xFF);

  assertStrictEquals(testFromBytes([0, 0, 0xFF, 0xFF], be), 0xFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF, 0, 0], le), 0xFFFF);

  assertStrictEquals(testFromBytes([0, 0xFF, 0xFF, 0xFF], be), 0xFFFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF, 0xFF, 0], le), 0xFFFFFF);

  assertStrictEquals(testFromBytes([0xFF, 0xFF, 0xFF, 0xFF]), 0xFFFFFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF, 0xFF, 0xFF], be), 0xFFFFFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF, 0xFF, 0xFF], le), 0xFFFFFFFF);

  assertStrictEquals(testFromBytes([0, 0, 13, 101], be), 3429);
  assertStrictEquals(testFromBytes([101, 13, 0, 0], le), 3429);
});

Deno.test("Numerics.Uint32.fromBytes() - error", () => {
  assertThrows(
    () => {
      Numerics.Uint32.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0, 0]);
    },
    RangeError,
    "The length of input must be 4",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0, 0, 0, 0]);
    },
    RangeError,
    "The length of input must be 4",
  );
});
