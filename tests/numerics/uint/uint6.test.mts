import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Uint6.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint6.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint6.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint6.MAX_VALUE, 0x3F);
});

Deno.test("Numerics.Uint6.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint6.BIT_LENGTH, 6);
});

Deno.test("Numerics.Uint6.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint6.BYTE_LENGTH, 1);
});

Deno.test("Numerics.Uint6[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint6.toString(), "[object Uint6]");
});
