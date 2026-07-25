import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";
import { stringifyNumbers } from "../../_.mts";

Deno.test("Numerics.Range.safeIntClosedRange()", () => {
  const r1 = Numerics.Range.safeIntClosedRange(1, 4);
  assertStrictEquals(r1.min, 1);
  assertStrictEquals(r1.max, 4);
});

Deno.test("Numerics.Range.safeIntClosedRange() - error", () => {
  assertThrows(
    () => {
      Numerics.Range.safeIntClosedRange(1n as unknown as number, 4);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Range.safeIntClosedRange(1, 4n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Range.safeIntClosedRange(1, Number.NaN);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Range.safeIntClosedRange(1, Number.POSITIVE_INFINITY);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Range.safeIntClosedRange(1, 1.5);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Range.safeIntClosedRange(1, 0);
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );
});

Deno.test("Numerics.Range.ClosedRange<number>.min", () => {
  const r1 = Numerics.Range.safeIntClosedRange(-1, 0);
  assertStrictEquals(r1.min, -1);
});

Deno.test("Numerics.Range.ClosedRange<number>.max", () => {
  const r1 = Numerics.Range.safeIntClosedRange(-1, 0);
  assertStrictEquals(r1.max, 0);
});

Deno.test("Numerics.Range.ClosedRange<number>.contains()", () => {
  const r1 = Numerics.Range.safeIntClosedRange(-1, 0);
  assertStrictEquals(r1.contains(-2), false);
  assertStrictEquals(r1.contains(-1), true);
  assertStrictEquals(r1.contains(-0), true);
  assertStrictEquals(r1.contains(0), true);
  assertStrictEquals(r1.contains(1), false);

  assertStrictEquals(r1.contains(-0.5), false);
  assertStrictEquals(r1.contains(Number.NaN), false);
  assertStrictEquals(r1.contains("0" as unknown as number), false);
  assertStrictEquals(r1.contains(0n as unknown as number), false);

  const r2 = Numerics.Range.safeIntClosedRange(1, 3);
  assertStrictEquals(r2.contains(0), false);
  assertStrictEquals(r2.contains(1), true);
  assertStrictEquals(r2.contains(2), true);
  assertStrictEquals(r2.contains(3), true);
  assertStrictEquals(r2.contains(4), false);

  const r3 = Numerics.Range.safeIntClosedRange(5, 5);
  assertStrictEquals(r3.contains(4), false);
  assertStrictEquals(r3.contains(5), true);
  assertStrictEquals(r3.contains(6), false);
});

Deno.test("Numerics.Range.ClosedRange<number>[Symbol.iterator]()", () => {
  const r1i = Numerics.Range.safeIntClosedRange(-1, 0)
    [Symbol.iterator]();
  assertStrictEquals(stringifyNumbers(r1i), "-1,0");

  const r2i = Numerics.Range.safeIntClosedRange(1, 3)
    [Symbol.iterator]();
  assertStrictEquals(stringifyNumbers(r2i), "1,2,3");
});
