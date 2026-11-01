import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char16 } = Textuals;

Deno.test("Textuals.Char16.fromUint16()", () => {
  assertStrictEquals(Char16.fromUint16(0), "\u0000");
  assertStrictEquals(Char16.fromUint16(0xFFFF), "\uFFFF");
  assertStrictEquals(Char16.fromUint16(0xD800), "\u{D800}");
  assertStrictEquals(Char16.fromUint16(0xDFFF), "\u{DFFF}");

  assertThrows(
    () => {
      Char16.fromUint16(-1);
    },
    TypeError,
    "Input must be a 16-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      Char16.fromUint16(0x10000);
    },
    TypeError,
    "Input must be a 16-bit unsigned integer of type `number`",
  );
});
