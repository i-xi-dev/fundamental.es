import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePoint } = Textuals;

Deno.test("Textuals.CodePoint.isVariationSelector()", () => {
  assertStrictEquals(CodePoint.isVariationSelector(0xFDFF), false);
  assertStrictEquals(CodePoint.isVariationSelector(0xFE00), true);
  assertStrictEquals(CodePoint.isVariationSelector(0xFE0F), true);
  assertStrictEquals(CodePoint.isVariationSelector(0xFE10), false);
  assertStrictEquals(CodePoint.isVariationSelector(0xE00FF), false);
  assertStrictEquals(CodePoint.isVariationSelector(0xE0100), true);
  assertStrictEquals(CodePoint.isVariationSelector(0xE01EF), true);
  assertStrictEquals(CodePoint.isVariationSelector(0xE01F0), false);
  assertStrictEquals(CodePoint.isVariationSelector(0x180A), false);
  assertStrictEquals(CodePoint.isVariationSelector(0x180B), true);
  assertStrictEquals(CodePoint.isVariationSelector(0x180F), true);
  assertStrictEquals(CodePoint.isVariationSelector(0x1810), false);
});
