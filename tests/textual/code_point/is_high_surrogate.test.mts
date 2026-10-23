import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePoint } = Textuals;

Deno.test("Textuals.CodePoint.isHighSurrogate()", () => {
  assertStrictEquals(CodePoint.isHighSurrogate(0xD7FF), false);
  assertStrictEquals(CodePoint.isHighSurrogate(0xD800), true);
  assertStrictEquals(CodePoint.isHighSurrogate(0xDBFF), true);
  assertStrictEquals(CodePoint.isHighSurrogate(0xDC00), false);
  assertStrictEquals(CodePoint.isHighSurrogate(0xDFFF), false);
  assertStrictEquals(CodePoint.isHighSurrogate(0xE000), false);

  assertStrictEquals(CodePoint.isHighSurrogate(-1), false);
  assertStrictEquals(CodePoint.isHighSurrogate(0x110000), false);
});
