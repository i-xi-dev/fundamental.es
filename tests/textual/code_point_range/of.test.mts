import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePointRange } = Textuals;

Deno.test("Textuals.CodePointRange.of()", () => {
  const p0 = CodePointRange.of(0, 0x10FFFF);
  assertStrictEquals(p0.min, 0);
  assertStrictEquals(p0.max, 0x10FFFF);

  const p1 = CodePointRange.of(3, 5);
  assertStrictEquals(p1.min, 3);
  assertStrictEquals(p1.max, 5);

  const p2 = CodePointRange.of(7, 7);
  assertStrictEquals(p2.min, 7);
  assertStrictEquals(p2.max, 7);

  assertThrows(
    () => {
      CodePointRange.of(-1, 0x10FFFF);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      CodePointRange.of(0, 0x110000 as 0);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      CodePointRange.of(5, 4);
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );
});
