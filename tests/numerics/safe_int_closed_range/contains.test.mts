import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.ClosedRange<number>.prototype.contains()", () => {
  const r1 = Numerics.SafeIntegerClosedRange.of(-1, 0);
  assertStrictEquals(r1.contains(-2), false);
  assertStrictEquals(r1.contains(-1), true);
  assertStrictEquals(r1.contains(-0), true);
  assertStrictEquals(r1.contains(0), true);
  assertStrictEquals(r1.contains(1), false);

  assertStrictEquals(r1.contains(-0.5), false);
  assertStrictEquals(r1.contains(Number.NaN), false);
  assertStrictEquals(r1.contains("0" as unknown as number), false);
  assertStrictEquals(r1.contains(0n as unknown as number), false);

  const r2 = Numerics.SafeIntegerClosedRange.of(1, 3);
  assertStrictEquals(r2.contains(0), false);
  assertStrictEquals(r2.contains(1), true);
  assertStrictEquals(r2.contains(2), true);
  assertStrictEquals(r2.contains(3), true);
  assertStrictEquals(r2.contains(4), false);

  const r3 = Numerics.SafeIntegerClosedRange.of(5, 5);
  assertStrictEquals(r3.contains(4), false);
  assertStrictEquals(r3.contains(5), true);
  assertStrictEquals(r3.contains(6), false);
});
