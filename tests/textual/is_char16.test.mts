import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

Deno.test("Textuals.isChar16()", () => {
  assertStrictEquals(Textuals.isChar16(""), false);
  assertStrictEquals(Textuals.isChar16("\u0000"), true);
  assertStrictEquals(Textuals.isChar16("1"), true);
  assertStrictEquals(Textuals.isChar16("11"), false);
  assertStrictEquals(Textuals.isChar16("\uFFFF"), true);
  assertStrictEquals(Textuals.isChar16("\u{10000}"), false);
  assertStrictEquals(Textuals.isChar16("\u{10000}\u{10000}"), false);
  assertStrictEquals(Textuals.isChar16("\uD800"), true);
  assertStrictEquals(Textuals.isChar16("\uDFFF"), true);
  assertStrictEquals(Textuals.isChar16("\uD800\uDFFF"), false);
  assertStrictEquals(Textuals.isChar16("\uDFFF\uD800"), false);

  assertStrictEquals(Textuals.isChar16(1), false);
  assertStrictEquals(Textuals.isChar16(null), false);
});
