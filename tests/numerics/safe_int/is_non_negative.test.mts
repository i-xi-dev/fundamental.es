import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

const { SafeInteger } = Numerics;

Deno.test("Numerics.SafeInteger.isNonNegative()", () => {
  assertStrictEquals(SafeInteger.isNonNegative(0), true);
  assertStrictEquals(SafeInteger.isNonNegative(-0), true);
  assertStrictEquals(SafeInteger.isNonNegative(1), true);
  assertStrictEquals(SafeInteger.isNonNegative(-1), false);

  assertStrictEquals(SafeInteger.isNonNegative(-10.1), false);
  assertStrictEquals(SafeInteger.isNonNegative(-9.9), false);
  assertStrictEquals(SafeInteger.isNonNegative(9.9), false);
  assertStrictEquals(SafeInteger.isNonNegative(10.1), false);

  assertStrictEquals(SafeInteger.isNonNegative(0n as unknown as number), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(-0n as unknown as number),
    false,
  );
  assertStrictEquals(SafeInteger.isNonNegative(1n as unknown as number), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(-1n as unknown as number),
    false,
  );

  assertStrictEquals(SafeInteger.isNonNegative(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(SafeInteger.isNonNegative(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(SafeInteger.isNonNegative(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(
    SafeInteger.isNonNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegative(null as unknown as number),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegative(true as unknown as number),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegative(false as unknown as number),
    false,
  );
  assertStrictEquals(SafeInteger.isNonNegative("" as unknown as number), false);
  assertStrictEquals(
    SafeInteger.isNonNegative("0" as unknown as number),
    false,
  );
});
