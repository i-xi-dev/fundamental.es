import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";
import { stringifyNumbers } from "../../_.mts";

Deno.test("Numerics.Range.bigIntClosedRange()", () => {
  const r1 = Numerics.Range.bigIntClosedRange<bigint>(1n, 4n);
  assertStrictEquals(r1.min, 1n);
  assertStrictEquals(r1.max, 4n);
});

Deno.test("Numerics.Range.bigIntClosedRange() - error", () => {
  assertThrows(
    () => {
      Numerics.Range.bigIntClosedRange<bigint>(1 as unknown as bigint, 4n);
    },
    TypeError,
    "Input must be a `bigint`",
  );

  assertThrows(
    () => {
      Numerics.Range.bigIntClosedRange<bigint>(1n, 4 as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );

  assertThrows(
    () => {
      Numerics.Range.bigIntClosedRange<bigint>(1n, 0n);
    },
    RangeError,
    "The lower and upper bounds of the range are contradictory",
  );
});

Deno.test("Numerics.Range.ClosedRange<bigint>.min", () => {
  const r1 = Numerics.Range.bigIntClosedRange<bigint>(-1n, 0n);
  assertStrictEquals(r1.min, -1n);
});

Deno.test("Numerics.Range.ClosedRange<bigint>.max", () => {
  const r1 = Numerics.Range.bigIntClosedRange<bigint>(-1n, 0n);
  assertStrictEquals(r1.max, 0n);
});

Deno.test("Numerics.Range.ClosedRange<bigint>.contains()", () => {
  const r1 = Numerics.Range.bigIntClosedRange<bigint>(-1n, 0n);
  assertStrictEquals(r1.contains(-2n), false);
  assertStrictEquals(r1.contains(-1n), true);
  assertStrictEquals(r1.contains(0n), true);
  assertStrictEquals(r1.contains(1n), false);

  assertStrictEquals(r1.contains(-0.5 as unknown as bigint), false);
  assertStrictEquals(r1.contains(Number.NaN as unknown as bigint), false);
  assertStrictEquals(r1.contains("0" as unknown as bigint), false);
  assertStrictEquals(r1.contains(0 as unknown as bigint), false);

  const r2 = Numerics.Range.bigIntClosedRange<bigint>(1n, 3n);
  assertStrictEquals(r2.contains(0n), false);
  assertStrictEquals(r2.contains(1n), true);
  assertStrictEquals(r2.contains(2n), true);
  assertStrictEquals(r2.contains(3n), true);
  assertStrictEquals(r2.contains(4n), false);

  const r3 = Numerics.Range.bigIntClosedRange<bigint>(5n, 5n);
  assertStrictEquals(r3.contains(4n), false);
  assertStrictEquals(r3.contains(5n), true);
  assertStrictEquals(r3.contains(6n), false);
});

Deno.test("Numerics.Range.ClosedRange<bigint>[Symbol.iterator]()", () => {
  const r1i = Numerics.Range.bigIntClosedRange<bigint>(-1n, 0n)
    [Symbol.iterator]();
  assertStrictEquals(stringifyNumbers(r1i), "-1,0");

  const r2i = Numerics.Range.bigIntClosedRange<bigint>(1n, 3n)
    [Symbol.iterator]();
  assertStrictEquals(stringifyNumbers(r2i), "1,2,3");
});
