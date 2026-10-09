import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";
import { stringifyNumbers } from "../../_.mts";

Deno.test("Numerics.ClosedRange<number>.prototype[Symbol.iterator]()", () => {
  const r1i = Numerics.SafeIntegerClosedRange.of(-1, 0)
    [Symbol.iterator]();
  assertStrictEquals(stringifyNumbers(r1i), "-1,0");

  const r2i = Numerics.SafeIntegerClosedRange.of(1, 3)
    [Symbol.iterator]();
  assertStrictEquals(stringifyNumbers(r2i), "1,2,3");
});
