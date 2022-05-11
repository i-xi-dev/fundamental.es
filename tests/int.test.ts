import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { Integer } from "../src/int.ts";

Deno.test("Integer.isNonNegativeInteger", () => {
  // isNonNegativeInteger(number)
  assertStrictEquals(Integer.isNonNegativeInteger(-1), false);
  assertStrictEquals(Integer.isNonNegativeInteger(-0), true);
  assertStrictEquals(Integer.isNonNegativeInteger(0), true);
  assertStrictEquals(Integer.isNonNegativeInteger(1), true);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Integer.isNonNegativeInteger(1.1), false);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.NaN), false);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.NEGATIVE_INFINITY), false);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.MIN_SAFE_INTEGER), false);

  // isNonNegativeInteger(any)
  assertStrictEquals(Integer.isNonNegativeInteger("1"), false);
  assertStrictEquals(Integer.isNonNegativeInteger(true), false);
});

Deno.test("Integer.isPositiveInteger", () => {
  // isPositiveInteger(number)
  assertStrictEquals(Integer.isPositiveInteger(-1), false);
  assertStrictEquals(Integer.isPositiveInteger(-0), false);
  assertStrictEquals(Integer.isPositiveInteger(0), false);
  assertStrictEquals(Integer.isPositiveInteger(1), true);
  assertStrictEquals(Integer.isPositiveInteger(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Integer.isNonNegativeInteger(1.1), false);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.NaN), false);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.NEGATIVE_INFINITY), false);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.MIN_SAFE_INTEGER), false);

  // isPositiveInteger(any)
  assertStrictEquals(Integer.isPositiveInteger("1"), false);
  assertStrictEquals(Integer.isPositiveInteger(true), false);
});

Deno.test("Integer.inRange", () => {
  // inRange(number,[number,number])
  assertStrictEquals(Integer.inRange(1, [1, 1]), true);
  assertStrictEquals(Integer.inRange(1, [0, 1]), true);
  assertStrictEquals(Integer.inRange(1, [1, 2]), true);
  assertStrictEquals(Integer.inRange(1, [-1, 0]), false);
  assertStrictEquals(Integer.inRange(1, [2, 3]), false);
  assertStrictEquals(Integer.inRange(1, [0, 2]), true);

  assertThrows(() => {
    Integer.inRange("" as unknown as number, [1, 1]);
  }, TypeError, undefined, "value");
  assertThrows(() => {
    Integer.inRange(1, ["" as unknown as number, 1]);
  }, TypeError, undefined, "minmax");
  assertThrows(() => {
    Integer.inRange(1, [1, "" as unknown as number]);
  }, TypeError, undefined, "minmax");
  assertThrows(() => {
    Integer.inRange(1, [] as unknown as [number,number]);
  }, TypeError, undefined, "minmax");
  assertThrows(() => {
    Integer.inRange(1, [3, 2]);
  }, RangeError, undefined, "minmax");
});
