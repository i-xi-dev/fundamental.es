import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePoint } = Textuals;

Deno.test("Textuals.CodePoint.isLowSurrogate()", () => {
  assertStrictEquals(CodePoint.isLowSurrogate(0xD7FF), false);
  assertStrictEquals(CodePoint.isLowSurrogate(0xD800), false);
  assertStrictEquals(CodePoint.isLowSurrogate(0xDBFF), false);
  assertStrictEquals(CodePoint.isLowSurrogate(0xDC00), true);
  assertStrictEquals(CodePoint.isLowSurrogate(0xDFFF), true);
  assertStrictEquals(CodePoint.isLowSurrogate(0xE000), false);

  assertStrictEquals(CodePoint.isLowSurrogate(-1), false);
  assertStrictEquals(CodePoint.isLowSurrogate(0x110000), false);
});
