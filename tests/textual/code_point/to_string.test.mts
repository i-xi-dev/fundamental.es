import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

Deno.test("Textuals.CodePoint.toString()", () => {
  assertStrictEquals(Textuals.CodePoint.toString(0), "U+0000");
  assertStrictEquals(Textuals.CodePoint.toString(0xFFFF), "U+FFFF");
  assertStrictEquals(Textuals.CodePoint.toString(0x10FFFF), "U+10FFFF");

  assertThrows(
    () => {
      Textuals.CodePoint.toString(-1);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Textuals.CodePoint.toString(0x110000);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Textuals.CodePoint.toString("1" as unknown as number);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      Textuals.CodePoint.toString(undefined as unknown as number);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );
});
