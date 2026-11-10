import { assertThrows } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

const { assertCodePoint } = Textuals;

Deno.test("Textuals.assertCodePoint()", () => {
  assertCodePoint(0, "T1");
  assertCodePoint(0xFFFF, "T2");
  assertCodePoint(0x10FFFF, "T3");

  assertThrows(
    () => {
      assertCodePoint(-1, "X1");
    },
    TypeError,
    "X1 must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      assertCodePoint(0x110000, "X2");
    },
    TypeError,
    "X2 must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      assertCodePoint("1" as unknown as number, "X3");
    },
    TypeError,
    "X3 must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      assertCodePoint(undefined as unknown as number, "X4");
    },
    TypeError,
    "X4 must be a Unicode code point of type `number`",
  );
});
