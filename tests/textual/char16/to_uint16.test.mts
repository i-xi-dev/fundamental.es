import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char16 } = Textuals;

Deno.test("Textuals.Char16.toUint16()", () => {
  assertStrictEquals(Char16.toUint16("\u0000"), 0);
  assertStrictEquals(Char16.toUint16("\uFFFF"), 0xFFFF);
  assertStrictEquals(Char16.toUint16("\uD800"), 0xD800);
  assertStrictEquals(Char16.toUint16("\uDFFF"), 0xDFFF);

  assertThrows(
    () => {
      Char16.toUint16("");
    },
    TypeError,
    "Input must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      Char16.toUint16("00");
    },
    TypeError,
    "Input must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      Char16.toUint16("\u{10000}");
    },
    TypeError,
    "Input must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      Char16.toUint16("\u{10FFFF}");
    },
    TypeError,
    "Input must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      Char16.toUint16(0 as unknown as string);
    },
    TypeError,
    "Input must be a single character with a code point of `0xFFFF` or lower",
  );
});
