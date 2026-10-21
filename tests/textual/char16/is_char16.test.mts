import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

Deno.test("Textuals.Char16.is()", () => {
  assertStrictEquals(Textuals.Char16.is(""), false);
  assertStrictEquals(Textuals.Char16.is("\u0000"), true);
  assertStrictEquals(Textuals.Char16.is("1"), true);
  assertStrictEquals(Textuals.Char16.is("11"), false);
  assertStrictEquals(Textuals.Char16.is("\uFFFF"), true);
  assertStrictEquals(Textuals.Char16.is("\u{10000}"), false);
  assertStrictEquals(Textuals.Char16.is("\u{10000}\u{10000}"), false);
  assertStrictEquals(Textuals.Char16.is("\uD800"), true);
  assertStrictEquals(Textuals.Char16.is("\uDFFF"), true);
  assertStrictEquals(Textuals.Char16.is("\uD800\uDFFF"), false);
  assertStrictEquals(Textuals.Char16.is("\uDFFF\uD800"), false);

  assertStrictEquals(Textuals.Char16.is(1 as unknown as string), false);
  assertStrictEquals(Textuals.Char16.is(null as unknown as string), false);
});
