import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";
import { stringifyNumbers } from "../../../_.mts";

const le = "little-endian";
const be = "big-endian";

function testToBytes(
  uint: bigint,
  order?: "little-endian" | "big-endian",
): Uint8Array<ArrayBuffer> {
  return Numerics.BigUint128.toBytes(uint, order);
}

Deno.test("Numerics.BigUint128.toBytes()", () => {
  assertStrictEquals(
    stringifyNumbers(testToBytes(0n, be)),
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0n, le)),
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0x3Fn, be)),
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0x3Fn, le)),
    "63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0x7Fn, be)),
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0x7Fn, le)),
    "127,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFn, be)),
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFn, le)),
    "255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFn, be)),
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFn, le)),
    "255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFn, be)),
    "0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFn, le)),
    "255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFn, be)),
    "0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFn, le)),
    "255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFn, be)),
    "0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFn, le)),
    "255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFF_FFFF_FFFF_FFFFn, be)),
    "0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFF_FFFF_FFFF_FFFFn, le)),
    "255,255,255,255,255,255,255,255,0,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn)),
    "255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn, be)),
    "255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn, le)),
    "255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255",
  );
});

Deno.test("Numerics.BigUint128.toBytes() - error", () => {
  assertThrows(
    () => {
      testToBytes(-1n);
    },
    TypeError,
    "Input must be a 128-bit unsigned integer of type `bigint`",
  );

  assertThrows(
    () => {
      testToBytes(0x1_0000_0000_0000_0000_0000_0000_0000_0000n);
    },
    TypeError,
    "Input must be a 128-bit unsigned integer of type `bigint`",
  );
});
