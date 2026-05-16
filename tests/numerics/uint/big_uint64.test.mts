import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

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
