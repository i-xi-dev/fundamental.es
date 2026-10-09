import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.ClosedRange<bigint>.prototype.min", () => {
  const r1 = Numerics.BigIntegerClosedRange.of(-1n, 0n);
  assertStrictEquals(r1.min, -1n);
});

Deno.test("Numerics.ClosedRange<bigint>.prototype.max", () => {
  const r1 = Numerics.BigIntegerClosedRange.of(-1n, 0n);
  assertStrictEquals(r1.max, 0n);
});
