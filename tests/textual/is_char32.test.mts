import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

Deno.test("Textuals.isChar32()", () => {
  assertStrictEquals(Textuals.isChar32(""), false);
  assertStrictEquals(Textuals.isChar32("\u0000"), true);
  assertStrictEquals(Textuals.isChar32("1"), true);
  assertStrictEquals(Textuals.isChar32("11"), false);
  assertStrictEquals(Textuals.isChar32("\uFFFF"), true);
  assertStrictEquals(Textuals.isChar32("\u{10000}"), true);
  assertStrictEquals(Textuals.isChar32("\u{10000}\u{10000}"), false);
  assertStrictEquals(Textuals.isChar32("\uD800"), true);
  assertStrictEquals(Textuals.isChar32("\uDFFF"), true);
  assertStrictEquals(Textuals.isChar32("\uD800\uDFFF"), true);
  assertStrictEquals(Textuals.isChar32("\uDFFF\uD800"), false);

  assertStrictEquals(Textuals.isChar32(1), false);
  assertStrictEquals(Textuals.isChar32(null), false);
});
