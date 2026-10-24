import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePoint } = Textuals;

Deno.test("Textuals.CodePoint.codePlaneOf()", () => {
  assertStrictEquals(CodePoint.codePlaneOf(0x0), 0);
  assertStrictEquals(CodePoint.codePlaneOf(0xFFFF), 0);
  assertStrictEquals(CodePoint.codePlaneOf(0x10000), 1);
  assertStrictEquals(CodePoint.codePlaneOf(0x1FFFF), 1);
  assertStrictEquals(CodePoint.codePlaneOf(0x20000), 2);
  assertStrictEquals(CodePoint.codePlaneOf(0x2FFFF), 2);
  assertStrictEquals(CodePoint.codePlaneOf(0x30000), 3);
  assertStrictEquals(CodePoint.codePlaneOf(0x3FFFF), 3);
  assertStrictEquals(CodePoint.codePlaneOf(0x40000), 4);
  assertStrictEquals(CodePoint.codePlaneOf(0x4FFFF), 4);
  assertStrictEquals(CodePoint.codePlaneOf(0x50000), 5);
  assertStrictEquals(CodePoint.codePlaneOf(0x5FFFF), 5);
  assertStrictEquals(CodePoint.codePlaneOf(0x60000), 6);
  assertStrictEquals(CodePoint.codePlaneOf(0x6FFFF), 6);
  assertStrictEquals(CodePoint.codePlaneOf(0x70000), 7);
  assertStrictEquals(CodePoint.codePlaneOf(0x7FFFF), 7);
  assertStrictEquals(CodePoint.codePlaneOf(0x80000), 8);
  assertStrictEquals(CodePoint.codePlaneOf(0x8FFFF), 8);
  assertStrictEquals(CodePoint.codePlaneOf(0x90000), 9);
  assertStrictEquals(CodePoint.codePlaneOf(0x9FFFF), 9);
  assertStrictEquals(CodePoint.codePlaneOf(0xA0000), 10);
  assertStrictEquals(CodePoint.codePlaneOf(0xAFFFF), 10);
  assertStrictEquals(CodePoint.codePlaneOf(0xB0000), 11);
  assertStrictEquals(CodePoint.codePlaneOf(0xBFFFF), 11);
  assertStrictEquals(CodePoint.codePlaneOf(0xC0000), 12);
  assertStrictEquals(CodePoint.codePlaneOf(0xCFFFF), 12);
  assertStrictEquals(CodePoint.codePlaneOf(0xD0000), 13);
  assertStrictEquals(CodePoint.codePlaneOf(0xDFFFF), 13);
  assertStrictEquals(CodePoint.codePlaneOf(0xE0000), 14);
  assertStrictEquals(CodePoint.codePlaneOf(0xEFFFF), 14);
  assertStrictEquals(CodePoint.codePlaneOf(0xF0000), 15);
  assertStrictEquals(CodePoint.codePlaneOf(0xFFFFF), 15);
  assertStrictEquals(CodePoint.codePlaneOf(0x100000), 16);
  assertStrictEquals(CodePoint.codePlaneOf(0x10FFFF), 16);

  assertThrows(
    () => {
      CodePoint.codePlaneOf(-1);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      CodePoint.codePlaneOf(0x110000);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      CodePoint.codePlaneOf("0" as unknown as number);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );
});
