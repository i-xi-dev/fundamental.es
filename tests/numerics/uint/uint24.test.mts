import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

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
