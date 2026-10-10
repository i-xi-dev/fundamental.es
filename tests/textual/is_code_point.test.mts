import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

Deno.test("Textuals.isCodePoint()", () => {
  assertStrictEquals(Textuals.isCodePoint(-1), false);
  assertStrictEquals(Textuals.isCodePoint(0), true);
  assertStrictEquals(Textuals.isCodePoint(0xFFFF), true);
  assertStrictEquals(Textuals.isCodePoint(0x10FFFF), true);
  assertStrictEquals(Textuals.isCodePoint(0x110000), false);

  assertStrictEquals(Textuals.isCodePoint("1"), false);
  assertStrictEquals(Textuals.isCodePoint(undefined), false);
});
