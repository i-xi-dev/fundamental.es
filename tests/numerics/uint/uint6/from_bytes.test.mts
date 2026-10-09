import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

const le = "little-endian";
const be = "big-endian";

function testFromBytes(
  bytes: Array<number>,
  order?: "little-endian" | "big-endian",
): number {
  return Numerics.Uint6.fromBytes(Uint8Array.of(...bytes), order);
}

Deno.test("Numerics.Uint6.fromBytes()", () => {
  assertStrictEquals(testFromBytes([0]), 0);
  assertStrictEquals(testFromBytes([0], be), 0);
  assertStrictEquals(testFromBytes([0], le), 0);

  assertStrictEquals(testFromBytes([0x3F]), 0x3F);
  assertStrictEquals(testFromBytes([0x3F], be), 0x3F);
  assertStrictEquals(testFromBytes([0x3F], le), 0x3F);
});

Deno.test("Numerics.Uint6.fromBytes() - error", () => {
  assertThrows(
    () => {
      Numerics.Uint6.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
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

  assertThrows(
    () => {
      testFromBytes([0x40]);
    },
    RangeError,
    "Input must be 63 or less",
  );
});
