import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

Deno.test("Textuals.Char32.is()", () => {
  assertStrictEquals(Textuals.Char32.is(""), false);
  assertStrictEquals(Textuals.Char32.is("\u0000"), true);
  assertStrictEquals(Textuals.Char32.is("1"), true);
  assertStrictEquals(Textuals.Char32.is("11"), false);
  assertStrictEquals(Textuals.Char32.is("\uFFFF"), true);
  assertStrictEquals(Textuals.Char32.is("\u{10000}"), true);
  assertStrictEquals(Textuals.Char32.is("\u{10000}\u{10000}"), false);
  assertStrictEquals(Textuals.Char32.is("\uD800"), true);
  assertStrictEquals(Textuals.Char32.is("\uDFFF"), true);
  assertStrictEquals(Textuals.Char32.is("\uD800\uDFFF"), true);
  assertStrictEquals(Textuals.Char32.is("\uDFFF\uD800"), false);

  assertStrictEquals(Textuals.Char32.is(1 as unknown as string), false);
  assertStrictEquals(Textuals.Char32.is(null as unknown as string), false);
});
