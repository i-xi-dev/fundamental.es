import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";
import { stringifyNumbers } from "../../_.mts";

Deno.test("Numerics.ClosedRange<bigint>.prototype[Symbol.iterator]()", () => {
  const r1i = Numerics.BigIntegerClosedRange.of(-1n, 0n)
    [Symbol.iterator]();
  assertStrictEquals(stringifyNumbers(r1i), "-1,0");

  const r2i = Numerics.BigIntegerClosedRange.of(1n, 3n)
    [Symbol.iterator]();
  assertStrictEquals(stringifyNumbers(r2i), "1,2,3");
});
