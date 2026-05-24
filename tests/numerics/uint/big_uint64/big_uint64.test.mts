import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";
import { stringifyNumbers } from "../../../_.mts";

Deno.test("Numerics.BigUint64.MIN_VALUE", () => {
  assertStrictEquals(Numerics.BigUint64.MIN_VALUE, 0n);
});

Deno.test("Numerics.BigUint64.MAX_VALUE", () => {
  assertStrictEquals(Numerics.BigUint64.MAX_VALUE, 0xFFFF_FFFF_FFFF_FFFFn);
});

Deno.test("Numerics.BigUint64.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.BigUint64.BIT_LENGTH, 64);
});

Deno.test("Numerics.BigUint64.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.BigUint64.BYTE_LENGTH, 8);
});

Deno.test("Numerics.BigUint64[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.BigUint64.toString(), "[object BigUint64]");
});

const le = "little-endian";
const be = "big-endian";

function testFromBytes(
  bytes: Array<number>,
  order?: "little-endian" | "big-endian",
): bigint {
  return Numerics.BigUint64.fromBytes(Uint8Array.of(...bytes), order);
}

Deno.test("Numerics.BigUint64.fromBytes()", () => {
  assertStrictEquals(testFromBytes([0, 0, 0, 0, 0, 0, 0, 0]), 0n);
  assertStrictEquals(testFromBytes([0, 0, 0, 0, 0, 0, 0, 0], be), 0n);
  assertStrictEquals(testFromBytes([0, 0, 0, 0, 0, 0, 0, 0], le), 0n);

  assertStrictEquals(testFromBytes([0, 0, 0, 0, 0, 0, 0, 0x3F], be), 0x3Fn);
  assertStrictEquals(testFromBytes([0x3F, 0, 0, 0, 0, 0, 0, 0], le), 0x3Fn);

  assertStrictEquals(testFromBytes([0, 0, 0, 0, 0, 0, 0, 0x7F], be), 0x7Fn);
  assertStrictEquals(testFromBytes([0x7F, 0, 0, 0, 0, 0, 0, 0], le), 0x7Fn);

  assertStrictEquals(testFromBytes([0, 0, 0, 0, 0, 0, 0, 0xFF], be), 0xFFn);
  assertStrictEquals(testFromBytes([0xFF, 0, 0, 0, 0, 0, 0, 0], le), 0xFFn);

  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0, 0xFF, 0xFF], be),
    0xFFFFn,
  );
  assertStrictEquals(
    testFromBytes([0xFF, 0xFF, 0, 0, 0, 0, 0, 0], le),
    0xFFFFn,
  );

  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0xFF, 0xFF, 0xFF], be),
    0xFFFFFFn,
  );
  assertStrictEquals(
    testFromBytes([0xFF, 0xFF, 0xFF, 0, 0, 0, 0, 0], le),
    0xFFFFFFn,
  );

  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0xFF, 0xFF, 0xFF, 0xFF], be),
    0xFFFFFFFFn,
  );
  assertStrictEquals(
    testFromBytes([0xFF, 0xFF, 0xFF, 0xFF, 0, 0, 0, 0], le),
    0xFFFFFFFFn,
  );

  assertStrictEquals(
    testFromBytes([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]),
    0xFFFFFFFF_FFFFFFFFn,
  );
  assertStrictEquals(
    testFromBytes([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF], be),
    0xFFFFFFFF_FFFFFFFFn,
  );
  assertStrictEquals(
    testFromBytes([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF], le),
    0xFFFFFFFF_FFFFFFFFn,
  );

  assertStrictEquals(testFromBytes([0, 0, 0, 0, 0, 0, 13, 101], be), 3429n);
  assertStrictEquals(testFromBytes([101, 13, 0, 0, 0, 0, 0, 0], le), 3429n);
});

Deno.test("Numerics.BigUint64.fromBytes() - error", () => {
  assertThrows(
    () => {
      Numerics.BigUint64.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0, 0, 0, 0, 0, 0]);
    },
    RangeError,
    "The length of input must be 8",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    },
    RangeError,
    "The length of input must be 8",
  );
});

function testToBytes(
  uint: bigint,
  order?: "little-endian" | "big-endian",
): Uint8Array<ArrayBuffer> {
  return Numerics.BigUint64.toBytes(uint, order);
}

Deno.test("Numerics.BigUint64.toBytes()", () => {
  assertStrictEquals(stringifyNumbers(testToBytes(0n, be)), "0,0,0,0,0,0,0,0");
  assertStrictEquals(stringifyNumbers(testToBytes(0n, le)), "0,0,0,0,0,0,0,0");

  assertStrictEquals(
    stringifyNumbers(testToBytes(0x3Fn, be)),
    "0,0,0,0,0,0,0,63",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0x3Fn, le)),
    "63,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0x7Fn, be)),
    "0,0,0,0,0,0,0,127",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0x7Fn, le)),
    "127,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFn, be)),
    "0,0,0,0,0,0,0,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFn, le)),
    "255,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFn, be)),
    "0,0,0,0,0,0,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFn, le)),
    "255,255,0,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFn, be)),
    "0,0,0,0,0,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFn, le)),
    "255,255,255,0,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFn, be)),
    "0,0,0,0,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFn, le)),
    "255,255,255,255,0,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFn, be)),
    "0,0,255,255,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFn, le)),
    "255,255,255,255,255,255,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFFFFFn)),
    "255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFFFFFn, be)),
    "255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    stringifyNumbers(testToBytes(0xFFFFFFFFFFFFFFFFn, le)),
    "255,255,255,255,255,255,255,255",
  );
});

Deno.test("Numerics.BigUint64.toBytes() - error", () => {
  assertThrows(
    () => {
      testToBytes(-1n);
    },
    TypeError,
    "Input must be a 64-bit unsigned integer of type `bigint`",
  );

  assertThrows(
    () => {
      testToBytes(0x1_0000_0000_0000_0000n);
    },
    TypeError,
    "Input must be a 64-bit unsigned integer of type `bigint`",
  );
});

Deno.test("Numerics.BigUint64.truncateFrom()", () => {
  assertStrictEquals(
    Numerics.BigUint64.truncateFrom(-1n),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(Numerics.BigUint64.truncateFrom(0n), 0n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(64n), 64n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(65n), 65n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(128n), 128n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(129n), 129n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(256n), 256n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(257n), 257n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(512n), 512n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(513n), 513n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(65535n), 65535n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(65536n), 65536n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(65537n), 65537n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(131071n), 131071n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(131072n), 131072n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(16777215n), 16777215n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(16777216n), 16777216n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(33554431n), 33554431n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(33554432n), 33554432n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(4294967295n), 4294967295n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(4294967296n), 4294967296n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(8589934591n), 8589934591n);
  assertStrictEquals(Numerics.BigUint64.truncateFrom(8589934592n), 8589934592n);
  assertStrictEquals(
    Numerics.BigUint64.truncateFrom(0xFFFF_FFFF_FFFF_FFFFn),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(
    Numerics.BigUint64.truncateFrom(0x1_0000_0000_0000_0000n),
    0n,
  );

  assertThrows(
    () => {
      Numerics.BigUint64.truncateFrom(0 as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );
  assertThrows(
    () => {
      Numerics.BigUint64.truncateFrom("1" as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );
  assertThrows(
    () => {
      Numerics.BigUint64.truncateFrom(undefined as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );
});
