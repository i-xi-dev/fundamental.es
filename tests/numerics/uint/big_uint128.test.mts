import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.BigUint128.MIN_VALUE", () => {
  assertStrictEquals(Numerics.BigUint128.MIN_VALUE, 0n);
});

Deno.test("Numerics.BigUint128.MAX_VALUE", () => {
  assertStrictEquals(
    Numerics.BigUint128.MAX_VALUE,
    0xFFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFFn,
  );
});

Deno.test("Numerics.BigUint128.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.BigUint128.BIT_LENGTH, 128);
});

Deno.test("Numerics.BigUint128.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.BigUint128.BYTE_LENGTH, 16);
});

Deno.test("Numerics.BigUint128[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.BigUint128.toString(), "[object BigUint128]");
});

const le = "little-endian";
const be = "big-endian";

function testFromBytes(
  bytes: Array<number>,
  order?: "little-endian" | "big-endian",
): bigint {
  return Numerics.BigUint128.fromBytes(Uint8Array.of(...bytes), order);
}

Deno.test("Numerics.BigUint128.fromBytes()", () => {
  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    0n,
  );
  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], be),
    0n,
  );
  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], le),
    0n,
  );

  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3F], be),
    0x3Fn,
  );
  assertStrictEquals(
    testFromBytes([0x3F, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], le),
    0x3Fn,
  );

  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x7F], be),
    0x7Fn,
  );
  assertStrictEquals(
    testFromBytes([0x7F, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], le),
    0x7Fn,
  );

  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xFF], be),
    0xFFn,
  );
  assertStrictEquals(
    testFromBytes([0xFF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], le),
    0xFFn,
  );

  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xFF, 0xFF], be),
    0xFFFFn,
  );
  assertStrictEquals(
    testFromBytes([0xFF, 0xFF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], le),
    0xFFFFn,
  );

  assertStrictEquals(
    testFromBytes(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xFF, 0xFF, 0xFF],
      be,
    ),
    0xFFFFFFn,
  );
  assertStrictEquals(
    testFromBytes(
      [0xFF, 0xFF, 0xFF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      le,
    ),
    0xFFFFFFn,
  );

  assertStrictEquals(
    testFromBytes(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xFF, 0xFF, 0xFF, 0xFF],
      be,
    ),
    0xFFFFFFFFn,
  );
  assertStrictEquals(
    testFromBytes(
      [0xFF, 0xFF, 0xFF, 0xFF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      le,
    ),
    0xFFFFFFFFn,
  );

  assertStrictEquals(
    testFromBytes([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
    ], be),
    0xFFFFFFFF_FFFFFFFFn,
  );
  assertStrictEquals(
    testFromBytes([
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ], le),
    0xFFFFFFFF_FFFFFFFFn,
  );

  assertStrictEquals(
    testFromBytes([
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
    ]),
    0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn,
  );
  assertStrictEquals(
    testFromBytes([
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
    ], be),
    0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn,
  );
  assertStrictEquals(
    testFromBytes([
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
      0xFF,
    ], le),
    0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn,
  );

  assertStrictEquals(
    testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 101], be),
    3429n,
  );
  assertStrictEquals(
    testFromBytes([101, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], le),
    3429n,
  );
});

Deno.test("Numerics.BigUint128.fromBytes() - error", () => {
  assertThrows(
    () => {
      Numerics.BigUint128.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    },
    RangeError,
    "The length of input must be 16",
  );

  assertThrows(
    () => {
      testFromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    },
    RangeError,
    "The length of input must be 16",
  );
});
