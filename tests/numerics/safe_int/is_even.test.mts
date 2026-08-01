import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.SafeInt.isEven()", () => {
  assertStrictEquals(Numerics.SafeInt.isEven(0), true);
  assertStrictEquals(Numerics.SafeInt.isEven(-0), true);
  assertStrictEquals(Numerics.SafeInt.isEven(1), false);
  assertStrictEquals(Numerics.SafeInt.isEven(-1), false);
  assertStrictEquals(Numerics.SafeInt.isEven(2), true);
  assertStrictEquals(Numerics.SafeInt.isEven(-2), true);
  assertStrictEquals(Numerics.SafeInt.isEven(3), false);
  assertStrictEquals(Numerics.SafeInt.isEven(-3), false);
  assertStrictEquals(Numerics.SafeInt.isEven(4), true);
  assertStrictEquals(Numerics.SafeInt.isEven(-4), true);
});
