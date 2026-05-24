import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";
import { stringifyNumbers } from "../../../_.mts";

Deno.test("Numerics.Uint16.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint16.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint16.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint16.MAX_VALUE, 0xFFFF);
});

Deno.test("Numerics.Uint16.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint16.BIT_LENGTH, 16);
});

Deno.test("Numerics.Uint16.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint16.BYTE_LENGTH, 2);
});

Deno.test("Numerics.Uint16[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint16.toString(), "[object Uint16]");
});

const le = "little-endian";
const be = "big-endian";

function testFromBytes(
  bytes: Array<number>,
  order?: "little-endian" | "big-endian",
): number {
  return Numerics.Uint16.fromBytes(Uint8Array.of(...bytes), order);
}

Deno.test("Numerics.Uint16.fromBytes()", () => {
  assertStrictEquals(testFromBytes([0, 0]), 0);
  assertStrictEquals(testFromBytes([0, 0], be), 0);
  assertStrictEquals(testFromBytes([0, 0], le), 0);

  assertStrictEquals(testFromBytes([0, 0x3F], be), 0x3F);
  assertStrictEquals(testFromBytes([0x3F, 0], le), 0x3F);

  assertStrictEquals(testFromBytes([0, 0x7F], be), 0x7F);
  assertStrictEquals(testFromBytes([0x7F, 0], le), 0x7F);

  assertStrictEquals(testFromBytes([0, 0xFF], be), 0xFF);
  assertStrictEquals(testFromBytes([0xFF, 0], le), 0xFF);

  assertStrictEquals(testFromBytes([0xFF, 0xFF]), 0xFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF], be), 0xFFFF);
  assertStrictEquals(testFromBytes([0xFF, 0xFF], le), 0xFFFF);

  assertStrictEquals(testFromBytes([13, 101], be), 3429);
  assertStrictEquals(testFromBytes([101, 13], le), 3429);
});

Deno.test("Numerics.Uint16.fromBytes() - error", () => {
  assertThrows(
    () => {
      Numerics.Uint16.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      testFromBytes([0]);
    },
    RangeError,
    "The length of input must be 2",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0, 0]);
    },
    RangeError,
    "The length of input must be 2",
  );
});

function testToBytes(
  uint: number,
  order?: "little-endian" | "big-endian",
): Uint8Array<ArrayBuffer> {
  return Numerics.Uint16.toBytes(uint, order);
}

Deno.test("Numerics.Uint16.toBytes()", () => {
  assertStrictEquals(stringifyNumbers(testToBytes(0, be)), "0,0");
  assertStrictEquals(stringifyNumbers(testToBytes(0, le)), "0,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, be)), "0,63");
  assertStrictEquals(stringifyNumbers(testToBytes(0x3F, le)), "63,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, be)), "0,127");
  assertStrictEquals(stringifyNumbers(testToBytes(0x7F, le)), "127,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, be)), "0,255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFF, le)), "255,0");

  assertStrictEquals(stringifyNumbers(testToBytes(0xFFFF)), "255,255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFFFF, be)), "255,255");
  assertStrictEquals(stringifyNumbers(testToBytes(0xFFFF, le)), "255,255");
});

Deno.test("Numerics.Uint16.toBytes() - error", () => {
  assertThrows(
    () => {
      testToBytes(-1);
    },
    TypeError,
    "Input must be a 16-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testToBytes(0x10000);
    },
    TypeError,
    "Input must be a 16-bit unsigned integer of type `number`",
  );
});

Deno.test("Numerics.Uint16.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint16.truncateFrom(-1), 65535);
  assertStrictEquals(Numerics.Uint16.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint16.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint16.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint16.truncateFrom(128), 128);
  assertStrictEquals(Numerics.Uint16.truncateFrom(129), 129);
  assertStrictEquals(Numerics.Uint16.truncateFrom(256), 256);
  assertStrictEquals(Numerics.Uint16.truncateFrom(257), 257);
  assertStrictEquals(Numerics.Uint16.truncateFrom(512), 512);
  assertStrictEquals(Numerics.Uint16.truncateFrom(513), 513);
  assertStrictEquals(Numerics.Uint16.truncateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint16.truncateFrom(65536), 0);
  assertStrictEquals(Numerics.Uint16.truncateFrom(65537), 1);
  assertStrictEquals(Numerics.Uint16.truncateFrom(131071), 65535);
  assertStrictEquals(Numerics.Uint16.truncateFrom(131072), 0);

  assertThrows(
    () => {
      Numerics.Uint16.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint16.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint16.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});

Deno.test("Numerics.Uint16.saturateFrom()", () => {
  assertStrictEquals(Numerics.Uint16.saturateFrom(0), 0);
  assertStrictEquals(Object.is(Numerics.Uint16.saturateFrom(-0), 0), true);
  assertStrictEquals(Numerics.Uint16.saturateFrom(1), 1);
  assertStrictEquals(Numerics.Uint16.saturateFrom(63), 63);
  assertStrictEquals(Numerics.Uint16.saturateFrom(64), 64);
  assertStrictEquals(Numerics.Uint16.saturateFrom(127), 127);
  assertStrictEquals(Numerics.Uint16.saturateFrom(128), 128);
  assertStrictEquals(Numerics.Uint16.saturateFrom(255), 255);
  assertStrictEquals(Numerics.Uint16.saturateFrom(256), 256);
  assertStrictEquals(Numerics.Uint16.saturateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint16.saturateFrom(65536), 65535);
  assertStrictEquals(Numerics.Uint16.saturateFrom(-1), 0);

  assertStrictEquals(Numerics.Uint16.saturateFrom(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(
    Numerics.Uint16.saturateFrom(Number.MAX_SAFE_INTEGER),
    65535,
  );

  assertThrows(
    () => {
      Numerics.Uint16.saturateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint16.saturateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint16.saturateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
