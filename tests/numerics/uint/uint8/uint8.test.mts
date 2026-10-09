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

Deno.test("Numerics.Uint8.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint8.truncateFrom(-1), 255);
  assertStrictEquals(Numerics.Uint8.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint8.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint8.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint8.truncateFrom(128), 128);
  assertStrictEquals(Numerics.Uint8.truncateFrom(129), 129);
  assertStrictEquals(Numerics.Uint8.truncateFrom(256), 0);
  assertStrictEquals(Numerics.Uint8.truncateFrom(257), 1);
  assertStrictEquals(Numerics.Uint8.truncateFrom(512), 0);
  assertStrictEquals(Numerics.Uint8.truncateFrom(513), 1);

  assertThrows(
    () => {
      Numerics.Uint8.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint8.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint8.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});

Deno.test("Numerics.Uint8.saturateFrom()", () => {
  assertStrictEquals(Numerics.Uint8.saturateFrom(0), 0);
  assertStrictEquals(Object.is(Numerics.Uint8.saturateFrom(-0), 0), true);
  assertStrictEquals(Numerics.Uint8.saturateFrom(1), 1);
  assertStrictEquals(Numerics.Uint8.saturateFrom(63), 63);
  assertStrictEquals(Numerics.Uint8.saturateFrom(64), 64);
  assertStrictEquals(Numerics.Uint8.saturateFrom(127), 127);
  assertStrictEquals(Numerics.Uint8.saturateFrom(128), 128);
  assertStrictEquals(Numerics.Uint8.saturateFrom(255), 255);
  assertStrictEquals(Numerics.Uint8.saturateFrom(256), 255);
  assertStrictEquals(Numerics.Uint8.saturateFrom(-1), 0);

  assertStrictEquals(Numerics.Uint8.saturateFrom(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Numerics.Uint8.saturateFrom(Number.MAX_SAFE_INTEGER), 255);

  assertThrows(
    () => {
      Numerics.Uint8.saturateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint8.saturateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint8.saturateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
