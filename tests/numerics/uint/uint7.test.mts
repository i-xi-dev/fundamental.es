import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";
import { stringifyNumbers } from "../../_.mts";

Deno.test("Numerics.Uint7.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint7.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint7.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint7.MAX_VALUE, 0x7F);
});

Deno.test("Numerics.Uint7.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint7.BIT_LENGTH, 7);
});

Deno.test("Numerics.Uint7.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint7.BYTE_LENGTH, 1);
});

Deno.test("Numerics.Uint7[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint7.toString(), "[object Uint7]");
});

const le = "little-endian";
const be = "big-endian";

function testFromBytes(
  bytes: Array<number>,
  order?: "little-endian" | "big-endian",
): number {
  return Numerics.Uint7.fromBytes(Uint8Array.of(...bytes), order);
}

Deno.test("Numerics.Uint7.fromBytes()", () => {
  assertStrictEquals(testFromBytes([0]), 0);
  assertStrictEquals(testFromBytes([0], be), 0);
  assertStrictEquals(testFromBytes([0], le), 0);

  assertStrictEquals(testFromBytes([0x3F]), 0x3F);
  assertStrictEquals(testFromBytes([0x3F], be), 0x3F);
  assertStrictEquals(testFromBytes([0x3F], le), 0x3F);

  assertStrictEquals(testFromBytes([0x7F]), 0x7F);
  assertStrictEquals(testFromBytes([0x7F], be), 0x7F);
  assertStrictEquals(testFromBytes([0x7F], le), 0x7F);
});

Deno.test("Numerics.Uint7.fromBytes() - error", () => {
  assertThrows(
    () => {
      Numerics.Uint7.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
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
      testFromBytes([0x80]);
    },
    RangeError,
    "Input overflows the `Uint7`",
  );
});

function testToBytes(
  uint: number,
  order?: "little-endian" | "big-endian",
): Uint8Array<ArrayBuffer> {
  return Numerics.Uint7.toBytes(uint, order);
}

Deno.test("Numerics.Uint7.toBytes()", () => {
  assertStrictEquals(stringifyNumbers(testToBytes(0)), "0");
  assertStrictEquals(stringifyNumbers(testToBytes(0, be)), "0");
  assertStrictEquals(stringifyNumbers(testToBytes(0, le)), "0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x3F)), "63");
  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, be)), "63");
  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, le)), "63");

  assertStrictEquals(stringifyNumbers(testToBytes(0x7F)), "127");
  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, be)), "127");
  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, le)), "127");
});

Deno.test("Numerics.Uint7.toBytes() - error", () => {
  assertThrows(
    () => {
      testToBytes(-1);
    },
    TypeError,
    "Input must be a 7-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testToBytes(0x80);
    },
    TypeError,
    "Input must be a 7-bit unsigned integer of type `number`",
  );
});
