import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePoint } = Textuals;

Deno.test("Textuals.CodePoint.isSurrogate()", () => {
  assertStrictEquals(CodePoint.isSurrogate(0xD7FF), false);
  assertStrictEquals(CodePoint.isSurrogate(0xD800), true);
  assertStrictEquals(CodePoint.isSurrogate(0xDBFF), true);
  assertStrictEquals(CodePoint.isSurrogate(0xDC00), true);
  assertStrictEquals(CodePoint.isSurrogate(0xDFFF), true);
  assertStrictEquals(CodePoint.isSurrogate(0xE000), false);

  assertStrictEquals(CodePoint.isSurrogate(-1), false);
  assertStrictEquals(CodePoint.isSurrogate(0x110000), false);
});
