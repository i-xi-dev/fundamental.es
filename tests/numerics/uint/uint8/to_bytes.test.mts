import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";
import { stringifyNumbers } from "../../../_.mts";

const le = "little-endian";
const be = "big-endian";

function testToBytes(
  uint: number,
  order?: "little-endian" | "big-endian",
): Uint8Array<ArrayBuffer> {
  return Numerics.Uint8.toBytes(uint, order);
}

Deno.test("Numerics.Uint8.toBytes()", () => {
  assertStrictEquals(stringifyNumbers(testToBytes(0)), "0");
  assertStrictEquals(stringifyNumbers(testToBytes(0, be)), "0");
  assertStrictEquals(stringifyNumbers(testToBytes(0, le)), "0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x3F)), "63");
  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, be)), "63");
  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, le)), "63");

  assertStrictEquals(stringifyNumbers(testToBytes(0x7F)), "127");
  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, be)), "127");
  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, le)), "127");

  assertStrictEquals(stringifyNumbers(testToBytes(0xFF)), "255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, be)), "255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, le)), "255");
});

Deno.test("Numerics.Uint8.toBytes() - error", () => {
  assertThrows(
    () => {
      testToBytes(-1);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testToBytes(0x100);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );
});
