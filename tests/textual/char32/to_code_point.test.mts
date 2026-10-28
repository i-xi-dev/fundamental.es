import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char32 } = Textuals;

Deno.test("Textuals.Char32.toCodePoint()", () => {
  assertStrictEquals(Char32.toCodePoint("\u0000"), 0);
  assertStrictEquals(Char32.toCodePoint("\uFFFF"), 0xFFFF);
  assertStrictEquals(Char32.toCodePoint("\u{10000}"), 0x10000);
  assertStrictEquals(Char32.toCodePoint("\u{10FFFF}"), 0x10FFFF);

  assertStrictEquals(Char32.toCodePoint("\uD800"), 0xD800);
  assertStrictEquals(Char32.toCodePoint("\uDFFF"), 0xDFFF);
  assertStrictEquals(Char32.toCodePoint("\uD800\uDFFF"), 0x103FF);

  assertThrows(
    () => {
      Char32.toCodePoint("");
    },
    TypeError,
    "Input must be a single character",
  );

  assertThrows(
    () => {
      Char32.toCodePoint("00");
    },
    TypeError,
    "Input must be a single character",
  );

  assertThrows(
    () => {
      Char32.toCodePoint("\uDFFF\uD800");
    },
    TypeError,
    "Input must be a single character",
  );
});
