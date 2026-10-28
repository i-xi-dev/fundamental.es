import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char32 } = Textuals;

Deno.test("Textuals.Char32.fromCodePoint()", () => {
  assertStrictEquals(Char32.fromCodePoint(0), "\u0000");
  assertStrictEquals(Char32.fromCodePoint(0xFFFF), "\uFFFF");
  assertStrictEquals(Char32.fromCodePoint(0x10000), "\u{10000}");
  assertStrictEquals(Char32.fromCodePoint(0x10FFFF), "\u{10FFFF}");

  assertThrows(
    () => {
      Char32.fromCodePoint(-1);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Char32.fromCodePoint(0x110000);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );
});
