import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";
import { stringifyNumbers } from "../../../_.mts";

const le = "little-endian";
const be = "big-endian";

function testToBytes(
  uint: number,
  order?: "little-endian" | "big-endian",
): Uint8Array<ArrayBuffer> {
  return Numerics.Uint48.toBytes(uint, order);
}

Deno.test("Numerics.Uint48.toBytes()", () => {
  assertStrictEquals(stringifyNumbers(testToBytes(0, be)), "0,0,0,0,0,0");
  assertStrictEquals(stringifyNumbers(testToBytes(0, le)), "0,0,0,0,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, be)), "0,0,0,0,0,63");
  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, le)), "63,0,0,0,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, be)), "0,0,0,0,0,127");
  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, le)), "127,0,0,0,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, be)), "0,0,0,0,0,255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, le)), "255,0,0,0,0,0");

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFF, be)),
    "0,0,0,0,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFF, le)),
    "255,255,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFF, be)),
    "0,0,0,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFF, le)),
    "255,255,255,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFF, be)),
    "0,0,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFF, le)),
    "255,255,255,255,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFF)),
    "255,255,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFF, be)),
    "255,255,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFF, le)),
    "255,255,255,255,255,255",
  );
});

Deno.test("Numerics.Uint48.toBytes() - error", () => {
  assertThrows(
    () => {
      testToBytes(-1);
    },
    TypeError,
    "Input must be a 48-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testToBytes(0x1000000000000);
    },
    TypeError,
    "Input must be a 48-bit unsigned integer of type `number`",
  );
});
