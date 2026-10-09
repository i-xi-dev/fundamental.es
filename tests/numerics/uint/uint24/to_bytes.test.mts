import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";
import { stringifyNumbers } from "../../../_.mts";

const le = "little-endian";
const be = "big-endian";

function testToBytes(
  uint: number,
  order?: "little-endian" | "big-endian",
): Uint8Array<ArrayBuffer> {
  return Numerics.Uint24.toBytes(uint, order);
}

Deno.test("Numerics.Uint24.toBytes()", () => {
  assertStrictEquals(stringifyNumbers(testToBytes(0, be)), "0,0,0");
  assertStrictEquals(stringifyNumbers(testToBytes(0, le)), "0,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, be)), "0,0,63");
  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, le)), "63,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, be)), "0,0,127");
  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, le)), "127,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, be)), "0,0,255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, le)), "255,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0xFFFF, be)), "0,255,255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFFFF, le)), "255,255,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0xFFFFFF)), "255,255,255");
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFF, be)),
    "255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFF, le)),
    "255,255,255",
  );
});

Deno.test("Numerics.Uint24.toBytes() - error", () => {
  assertThrows(
    () => {
      testToBytes(-1);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testToBytes(0x1000000);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );
});
