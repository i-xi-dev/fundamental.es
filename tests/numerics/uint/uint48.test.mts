import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Uint48.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint48.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint48.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint48.MAX_VALUE, 0xFFFF_FFFF_FFFF);
});

Deno.test("Numerics.Uint48.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint48.BIT_LENGTH, 48);
});

Deno.test("Numerics.Uint48.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint48.BYTE_LENGTH, 6);
});

Deno.test("Numerics.Uint48[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint48.toString(), "[object Uint48]");
});
