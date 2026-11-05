import { assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char32 } = Textuals;

Deno.test("Textuals.Char32.assert()", () => {
  Char32.assert("\u0000", "T1");
  Char32.assert("\uFFFF", "T2");
  Char32.assert("\uD800\uDC00", "T5");

  assertThrows(
    () => {
      Char32.assert("\uD800", "XX1");
    },
    TypeError,
    "XX1 must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.assert("\uDFFF", "XX2");
    },
    TypeError,
    "XX2 must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.assert(1 as unknown as string, "X1");
    },
    TypeError,
    "X1 must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.assert(null as unknown as string, "X2");
    },
    TypeError,
    "X2 must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.assert("", "X3");
    },
    TypeError,
    "X3 must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.assert("11", "X4");
    },
    TypeError,
    "X4 must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.assert("\uDC00\uD800", "X5");
    },
    TypeError,
    "X5 must be a well-formed single character",
  );
});
