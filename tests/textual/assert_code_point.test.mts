import { assertThrows } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

Deno.test("Textuals.assertCodePoint()", () => {
  Textuals.assertCodePoint(0, "T1");
  Textuals.assertCodePoint(0xFFFF, "T2");
  Textuals.assertCodePoint(0x10FFFF, "T3");

  assertThrows(
    () => {
      Textuals.assertCodePoint(-1, "X1");
    },
    TypeError,
    "X1 must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Textuals.assertCodePoint(0x110000, "X2");
    },
    TypeError,
    "X2 must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Textuals.assertCodePoint("1", "X3");
    },
    TypeError,
    "X3 must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Textuals.assertCodePoint(undefined, "X4");
    },
    TypeError,
    "X4 must be a Unicode code point of type `number`",
  );
});
