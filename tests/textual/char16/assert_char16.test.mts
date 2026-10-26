import { assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char16 } = Textuals;

Deno.test("Textuals.Char16.assert()", () => {
  Char16.assert("\u0000", "T1");
  Char16.assert("\uFFFF", "T2");
  Char16.assert("\uD800", "T3");
  Char16.assert("\uDFFF", "T4");

  assertThrows(
    () => {
      Char16.assert(1 as unknown as string, "X1");
    },
    TypeError,
    "X1 must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      Char16.assert(null as unknown as string, "X2");
    },
    TypeError,
    "X2 must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      Char16.assert("", "X3");
    },
    TypeError,
    "X3 must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      Char16.assert("11", "X4");
    },
    TypeError,
    "X4 must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      Char16.assert("\u{10000}", "X5");
    },
    TypeError,
    "X5 must be a single character with a code point of `0xFFFF` or lower",
  );
});
