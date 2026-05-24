import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";
import { stringifyNumbers } from "../../../_.mts";

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
