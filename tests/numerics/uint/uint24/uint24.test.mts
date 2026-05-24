import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";
import { stringifyNumbers } from "../../../_.mts";

Deno.test("Numerics.Uint24.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint24.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint24.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint24.MAX_VALUE, 0xFFFFFF);
});

Deno.test("Numerics.Uint24.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint24.BIT_LENGTH, 24);
});

Deno.test("Numerics.Uint24.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint24.BYTE_LENGTH, 3);
});

Deno.test("Numerics.Uint24[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint24.toString(), "[object Uint24]");
});

const le = "little-endian";
const be = "big-endian";

function testFromBytes(
  bytes: Array<number>,
  order?: "little-endian" | "big-endian",
): number {
  return Numerics.Uint24.fromBytes(Uint8Array.of(...bytes), order);
}

Deno.test("Numerics.Uint24.fromBytes()", () => {
  assertStrictEquals(testFromBytes([0, 0, 0]), 0);
  assertStrictEquals(testFromBytes([0, 0, 0], be), 0);
  assertStrictEquals(testFromBytes([0, 0, 0], le), 0);

  assertStrictEquals(testFromBytes([0, 0, 0x3F], be), 0x3F);
  assertStrictEquals(testFromBytes([0x3F, 0, 0], le), 0x3F);

  assertStrictEquals(testFromBytes([0, 0, 0x7F], be), 0x7F);
  assertStrictEquals(testFromBytes([0x7F, 0, 0], le), 0x7F);

  assertStrictEquals(testFromBytes([0, 0, 0xFF], be), 0xFF);
  assertStrictEquals(testFromBytes([0xFF, 0, 0], le), 0xFF);

  assertStrictEquals(testFromBytes([0, 0xFF, 0xFF], be), 0xFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF, 0], le), 0xFFFF);

  assertStrictEquals(testFromBytes([0xFF, 0xFF, 0xFF]), 0xFFFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF, 0xFF], be), 0xFFFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF, 0xFF], le), 0xFFFFFF);

  assertStrictEquals(testFromBytes([0, 13, 101], be), 3429);
  assertStrictEquals(testFromBytes([101, 13, 0], le), 3429);
});

Deno.test("Numerics.Uint24.fromBytes() - error", () => {
  assertThrows(
    () => {
      Numerics.Uint24.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0]);
    },
    RangeError,
    "The length of input must be 3",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0, 0, 0]);
    },
    RangeError,
    "The length of input must be 3",
  );
});

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

Deno.test("Numerics.Uint24.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint24.truncateFrom(-1), 16777215);
  assertStrictEquals(Numerics.Uint24.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint24.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint24.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint24.truncateFrom(128), 128);
  assertStrictEquals(Numerics.Uint24.truncateFrom(129), 129);
  assertStrictEquals(Numerics.Uint24.truncateFrom(256), 256);
  assertStrictEquals(Numerics.Uint24.truncateFrom(257), 257);
  assertStrictEquals(Numerics.Uint24.truncateFrom(512), 512);
  assertStrictEquals(Numerics.Uint24.truncateFrom(513), 513);
  assertStrictEquals(Numerics.Uint24.truncateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint24.truncateFrom(65536), 65536);
  assertStrictEquals(Numerics.Uint24.truncateFrom(65537), 65537);
  assertStrictEquals(Numerics.Uint24.truncateFrom(131071), 131071);
  assertStrictEquals(Numerics.Uint24.truncateFrom(131072), 131072);
  assertStrictEquals(Numerics.Uint24.truncateFrom(16777215), 16777215);
  assertStrictEquals(Numerics.Uint24.truncateFrom(16777216), 0);
  assertStrictEquals(Numerics.Uint24.truncateFrom(33554431), 16777215);
  assertStrictEquals(Numerics.Uint24.truncateFrom(33554432), 0);

  assertThrows(
    () => {
      Numerics.Uint24.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint24.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint24.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
