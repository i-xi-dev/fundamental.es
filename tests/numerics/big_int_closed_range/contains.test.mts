import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.ClosedRange<bigint>.prototype.contains()", () => {
  const r1 = Numerics.BigIntegerClosedRange.of(-1n, 0n);
  assertStrictEquals(r1.contains(-2n), false);
  assertStrictEquals(r1.contains(-1n), true);
  assertStrictEquals(r1.contains(0n), true);
  assertStrictEquals(r1.contains(1n), false);

  assertStrictEquals(r1.contains(-0.5 as unknown as bigint), false);
  assertStrictEquals(r1.contains(Number.NaN as unknown as bigint), false);
  assertStrictEquals(r1.contains("0" as unknown as bigint), false);
  assertStrictEquals(r1.contains(0 as unknown as bigint), false);

  const r2 = Numerics.BigIntegerClosedRange.of(1n, 3n);
  assertStrictEquals(r2.contains(0n), false);
  assertStrictEquals(r2.contains(1n), true);
  assertStrictEquals(r2.contains(2n), true);
  assertStrictEquals(r2.contains(3n), true);
  assertStrictEquals(r2.contains(4n), false);

  const r3 = Numerics.BigIntegerClosedRange.of(5n, 5n);
  assertStrictEquals(r3.contains(4n), false);
  assertStrictEquals(r3.contains(5n), true);
  assertStrictEquals(r3.contains(6n), false);
});
