import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Uint32.MIN_VALUE", () => {
  assertStrictEquals(Numerics.Uint32.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint32.MAX_VALUE", () => {
  assertStrictEquals(Numerics.Uint32.MAX_VALUE, 0xFFFF_FFFF);
});

Deno.test("Numerics.Uint32.BIT_LENGTH", () => {
  assertStrictEquals(Numerics.Uint32.BIT_LENGTH, 32);
});

Deno.test("Numerics.Uint32.BYTE_LENGTH", () => {
  assertStrictEquals(Numerics.Uint32.BYTE_LENGTH, 4);
});

Deno.test("Numerics.Uint32[Symbol.toStringTag]", () => {
  assertStrictEquals(Numerics.Uint32.toString(), "[object Uint32]");
});
