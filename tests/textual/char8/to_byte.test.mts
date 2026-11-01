import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char8 } = Textuals;

Deno.test("Textuals.Char8.toByte()", () => {
  assertStrictEquals(Char8.toByte("\u0000"), 0);
  assertStrictEquals(Char8.toByte("\u00FF"), 0xFF);

  assertThrows(
    () => {
      Char8.toByte("");
    },
    TypeError,
    "Input must be a single character with a code point of `0xFF` or lower",
  );

  assertThrows(
    () => {
      Char8.toByte("00");
    },
    TypeError,
    "Input must be a single character with a code point of `0xFF` or lower",
  );

  assertThrows(
    () => {
      Char8.toByte("\u{100}");
    },
    TypeError,
    "Input must be a single character with a code point of `0xFF` or lower",
  );

  assertThrows(
    () => {
      Char8.toByte(0 as unknown as string);
    },
    TypeError,
    "Input must be a single character with a code point of `0xFF` or lower",
  );
});
