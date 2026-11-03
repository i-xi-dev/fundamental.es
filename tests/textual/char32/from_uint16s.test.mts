import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char32 } = Textuals;

Deno.test("Textuals.Char32.fromUint16s()", () => {
  assertStrictEquals(Char32.fromUint16s([0]), "\u0000");
  assertStrictEquals(Char32.fromUint16s([0xFFFF]), "\uFFFF");
  assertStrictEquals(Char32.fromUint16s([0xD800, 0xDC00]), "\u{10000}");

  assertThrows(
    () => {
      Char32.fromUint16s(0 as unknown as [number]);
    },
    TypeError,
    "Input must be an `Array` of 16-bit unsigned integers of type `number`",
  );

  assertThrows(
    () => {
      Char32.fromUint16s(["0"] as unknown as [number]);
    },
    TypeError,
    "Input must be an `Array` of 16-bit unsigned integers of type `number`",
  );

  assertThrows(
    () => {
      Char32.fromUint16s([-1]);
    },
    TypeError,
    "Input must be an `Array` of 16-bit unsigned integers of type `number`",
  );

  assertThrows(
    () => {
      Char32.fromUint16s([0x10000]);
    },
    TypeError,
    "Input must be an `Array` of 16-bit unsigned integers of type `number`",
  );

  assertThrows(
    () => {
      Char32.fromUint16s([]);
    },
    RangeError,
    "The length of Input must be 1 or greater",
  );

  assertThrows(
    () => {
      Char32.fromUint16s([0, 0, 0]);
    },
    RangeError,
    "The length of Input must be 2 or less",
  );

  assertThrows(
    () => {
      Char32.fromUint16s([0xDC00, 0xD800]);
    },
    RangeError,
    "When input is a pair of values, input must be a surrogate pair",
  );

  assertThrows(
    () => {
      Char32.fromUint16s([0x0031, 0x0031]);
    },
    RangeError,
    "When input is a pair of values, input must be a surrogate pair",
  );
});
