import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.BigIntegerClosedRange.of()", () => {
  const r1 = Numerics.BigIntegerClosedRange.of(1n, 4n);
  assertStrictEquals(r1.min, 1n);
  assertStrictEquals(r1.max, 4n);
});

Deno.test("Numerics.BigIntegerClosedRange.of() - error", () => {
  assertThrows(
    () => {
      Numerics.BigIntegerClosedRange.of(1 as unknown as bigint, 4n);
    },
    TypeError,
    "Input must be a `bigint`",
  );

  assertThrows(
    () => {
      Numerics.BigIntegerClosedRange.of(1n, 4 as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );

  assertThrows(
    () => {
      Numerics.BigIntegerClosedRange.of(1n, 0n);
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );
});
