import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePoint } = Textuals;

Deno.test("Textuals.CodePoint.inBmp()", () => {
  assertStrictEquals(CodePoint.inBmp(0x0), true);
  assertStrictEquals(CodePoint.inBmp(0xFFFF), true);
  assertStrictEquals(CodePoint.inBmp(0x10000), false);
  assertStrictEquals(CodePoint.inBmp(0x10FFFF), false);

  assertStrictEquals(CodePoint.inBmp(-1), false);
  assertStrictEquals(CodePoint.inBmp(0x110000), false);
});
