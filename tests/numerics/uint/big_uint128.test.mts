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
