import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.SafeIntegerClosedRange.of()", () => {
  const r1 = Numerics.SafeIntegerClosedRange.of(1, 4);
  assertStrictEquals(r1.min, 1);
  assertStrictEquals(r1.max, 4);
});

Deno.test("Numerics.SafeIntegerClosedRange.of() - error", () => {
  assertThrows(
    () => {
      Numerics.SafeIntegerClosedRange.of(1n as unknown as number, 4);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeIntegerClosedRange.of(1, 4n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeIntegerClosedRange.of(1, Number.NaN);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeIntegerClosedRange.of(1, Number.POSITIVE_INFINITY);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeIntegerClosedRange.of(1, 1.5);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeIntegerClosedRange.of(1, 0);
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );
});
