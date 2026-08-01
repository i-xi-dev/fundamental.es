import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../src/mod.mts";

Deno.test("Numerics.isNonNegative()", () => {
  assertStrictEquals(Numerics.isNonNegative(0), true);
  assertStrictEquals(Numerics.isNonNegative(-0), true);
  assertStrictEquals(Numerics.isNonNegative(1), true);
  assertStrictEquals(Numerics.isNonNegative(-1), false);

  assertStrictEquals(Numerics.isNonNegative(-10.1), false);
  assertStrictEquals(Numerics.isNonNegative(-9.9), false);
  assertStrictEquals(Numerics.isNonNegative(9.9), true);
  assertStrictEquals(Numerics.isNonNegative(10.1), true);

  assertStrictEquals(Numerics.isNonNegative(0n), true);
  assertStrictEquals(Numerics.isNonNegative(-0n), true);
  assertStrictEquals(Numerics.isNonNegative(1n), true);
  assertStrictEquals(Numerics.isNonNegative(-1n), false);

  assertStrictEquals(Numerics.isNonNegative(Number.NaN), false);
  assertStrictEquals(Numerics.isNonNegative(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Numerics.isNonNegative(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Numerics.isNonNegative(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Numerics.isNonNegative(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    Numerics.isNonNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Numerics.isNonNegative(null as unknown as number), false);
  assertStrictEquals(Numerics.isNonNegative(true as unknown as number), false);
  assertStrictEquals(Numerics.isNonNegative(false as unknown as number), false);
  assertStrictEquals(Numerics.isNonNegative("" as unknown as number), false);
  assertStrictEquals(Numerics.isNonNegative("0" as unknown as number), false);
});
