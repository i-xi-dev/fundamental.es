import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

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
