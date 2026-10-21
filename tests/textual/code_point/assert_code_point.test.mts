import { assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

Deno.test("Textuals.CodePoint.assert()", () => {
  Textuals.CodePoint.assert(0, "T1");
  Textuals.CodePoint.assert(0xFFFF, "T2");
  Textuals.CodePoint.assert(0x10FFFF, "T3");

  assertThrows(
    () => {
      Textuals.CodePoint.assert(-1, "X1");
    },
    TypeError,
    "X1 must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Textuals.CodePoint.assert(0x110000, "X2");
    },
    TypeError,
    "X2 must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Textuals.CodePoint.assert("1" as unknown as number, "X3");
    },
    TypeError,
    "X3 must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Textuals.CodePoint.assert(undefined as unknown as number, "X4");
    },
    TypeError,
    "X4 must be a Unicode code point of type `number`",
  );
});
