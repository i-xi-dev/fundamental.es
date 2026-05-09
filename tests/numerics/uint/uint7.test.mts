import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Uint7.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint7.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint7.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint7.MAX_VALUE, 0x7F);
});

Deno.test("Numerics.Uint7.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint7.BIT_LENGTH, 7);
});

Deno.test("Numerics.Uint7.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint7.BYTE_LENGTH, 1);
});

Deno.test("Numerics.Uint7[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint7.toString(), "[object Uint7]");
});
