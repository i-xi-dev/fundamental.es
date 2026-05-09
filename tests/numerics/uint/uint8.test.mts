import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Uint8.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint8.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint8.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint8.MAX_VALUE, 0xFF);
});

Deno.test("Numerics.Uint8.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint8.BIT_LENGTH, 8);
});

Deno.test("Numerics.Uint8.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint8.BYTE_LENGTH, 1);
});

Deno.test("Numerics.Uint8[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint8.toString(), "[object Uint8]");
});
