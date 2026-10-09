import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";
import { stringifyNumbers } from "../../../_.mts";

const le = "little-endian";
const be = "big-endian";

function testToBytes(
  uint: number,
  order?: "little-endian" | "big-endian",
): Uint8Array<ArrayBuffer> {
  return Numerics.Uint32.toBytes(uint, order);
}

Deno.test("Numerics.Uint32.toBytes()", () => {
  assertStrictEquals(stringifyNumbers(testToBytes(0, be)), "0,0,0,0");
  assertStrictEquals(stringifyNumbers(testToBytes(0, le)), "0,0,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, be)), "0,0,0,63");
  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, le)), "63,0,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, be)), "0,0,0,127");
  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, le)), "127,0,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, be)), "0,0,0,255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, le)), "255,0,0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0xFFFF, be)), "0,0,255,255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFFFF, le)), "255,255,0,0");

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFF, be)),
    "0,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFF, le)),
    "255,255,255,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFF)),
    "255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFF, be)),
    "255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFF, le)),
    "255,255,255,255",
  );
});

Deno.test("Numerics.Uint32.toBytes() - error", () => {
  assertThrows(
    () => {
      testToBytes(-1);
    },
    TypeError,
    "Input must be a 32-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testToBytes(0x100000000);
    },
    TypeError,
    "Input must be a 32-bit unsigned integer of type `number`",
  );
});

Deno.test("Numerics.Uint32.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint32.truncateFrom(-1), 4294967295);
  assertStrictEquals(Numerics.Uint32.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint32.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint32.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint32.truncateFrom(128), 128);
  assertStrictEquals(Numerics.Uint32.truncateFrom(129), 129);
  assertStrictEquals(Numerics.Uint32.truncateFrom(256), 256);
  assertStrictEquals(Numerics.Uint32.truncateFrom(257), 257);
  assertStrictEquals(Numerics.Uint32.truncateFrom(512), 512);
  assertStrictEquals(Numerics.Uint32.truncateFrom(513), 513);
  assertStrictEquals(Numerics.Uint32.truncateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint32.truncateFrom(65536), 65536);
  assertStrictEquals(Numerics.Uint32.truncateFrom(65537), 65537);
  assertStrictEquals(Numerics.Uint32.truncateFrom(131071), 131071);
  assertStrictEquals(Numerics.Uint32.truncateFrom(131072), 131072);
  assertStrictEquals(Numerics.Uint32.truncateFrom(16777215), 16777215);
  assertStrictEquals(Numerics.Uint32.truncateFrom(16777216), 16777216);
  assertStrictEquals(Numerics.Uint32.truncateFrom(33554431), 33554431);
  assertStrictEquals(Numerics.Uint32.truncateFrom(33554432), 33554432);
  assertStrictEquals(Numerics.Uint32.truncateFrom(4294967295), 4294967295);
  assertStrictEquals(Numerics.Uint32.truncateFrom(4294967296), 0);
  assertStrictEquals(Numerics.Uint32.truncateFrom(8589934591), 4294967295);
  assertStrictEquals(Numerics.Uint32.truncateFrom(8589934592), 0);

  assertThrows(
    () => {
      Numerics.Uint32.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint32.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint32.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});

Deno.test("Numerics.Uint32.saturateFrom()", () => {
  assertStrictEquals(Numerics.Uint32.saturateFrom(0), 0);
  assertStrictEquals(Object.is(Numerics.Uint32.saturateFrom(-0), 0), true);
  assertStrictEquals(Numerics.Uint32.saturateFrom(1), 1);
  assertStrictEquals(Numerics.Uint32.saturateFrom(63), 63);
  assertStrictEquals(Numerics.Uint32.saturateFrom(64), 64);
  assertStrictEquals(Numerics.Uint32.saturateFrom(127), 127);
  assertStrictEquals(Numerics.Uint32.saturateFrom(128), 128);
  assertStrictEquals(Numerics.Uint32.saturateFrom(255), 255);
  assertStrictEquals(Numerics.Uint32.saturateFrom(256), 256);
  assertStrictEquals(Numerics.Uint32.saturateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint32.saturateFrom(65536), 65536);
  assertStrictEquals(Numerics.Uint32.saturateFrom(16777215), 16777215);
  assertStrictEquals(Numerics.Uint32.saturateFrom(16777216), 16777216);
  assertStrictEquals(Numerics.Uint32.saturateFrom(4294967295), 4294967295);
  assertStrictEquals(Numerics.Uint32.saturateFrom(4294967296), 4294967295);
  assertStrictEquals(Numerics.Uint32.saturateFrom(-1), 0);

  assertStrictEquals(Numerics.Uint32.saturateFrom(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(
    Numerics.Uint32.saturateFrom(Number.MAX_SAFE_INTEGER),
    4294967295,
  );

  assertThrows(
    () => {
      Numerics.Uint32.saturateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint32.saturateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint32.saturateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
