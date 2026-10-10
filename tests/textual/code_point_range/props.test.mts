import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

Deno.test("Textuals.CodePointRange.SURROGATES()", () => {
  const r1 = Textuals.CodePointRange.SURROGATES;
  assertStrictEquals(r1.min, 0xD800);
  assertStrictEquals(r1.max, 0xDFFF);
});

Deno.test("Textuals.CodePointRange.HIGH_SURROGATES()", () => {
  const r1 = Textuals.CodePointRange.HIGH_SURROGATES;
  assertStrictEquals(r1.min, 0xD800);
  assertStrictEquals(r1.max, 0xDBFF);
});
