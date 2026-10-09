import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../src/mod.mts";

Deno.test("Numerics.isSafeIntegerArray()", () => {
  assertStrictEquals(Numerics.isSafeIntegerArray([]), true);
  assertStrictEquals(Numerics.isSafeIntegerArray([1]), true);
  assertStrictEquals(Numerics.isSafeIntegerArray([1, 1.5]), false);
  assertStrictEquals(Numerics.isSafeIntegerArray([1, 2n]), false);
  assertStrictEquals(Numerics.isSafeIntegerArray(Uint8Array.of(1)), false);
  assertStrictEquals(Numerics.isSafeIntegerArray(1), false);
  assertStrictEquals(Numerics.isSafeIntegerArray("1"), false);
});
