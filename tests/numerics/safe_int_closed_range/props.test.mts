import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.ClosedRange<number>.prototype.min", () => {
  const r1 = Numerics.SafeIntegerClosedRange.of(-1, 0);
  assertStrictEquals(r1.min, -1);
});

Deno.test("Numerics.ClosedRange<number>.prototype.max", () => {
  const r1 = Numerics.SafeIntegerClosedRange.of(-1, 0);
  assertStrictEquals(r1.max, 0);
});
