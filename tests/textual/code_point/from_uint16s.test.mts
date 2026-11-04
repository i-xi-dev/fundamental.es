import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePoint } = Textuals;

Deno.test("Textuals.CodePoint.fromUint16s()", () => {
  assertStrictEquals(CodePoint.fromUint16s([0]), 0);
  assertStrictEquals(CodePoint.fromUint16s([0xFFFF]), 0xFFFF);
  assertStrictEquals(CodePoint.fromUint16s([0xD800, 0xDC00]), 0x10000);

  // for (let i = 0; i <= 0xFFFF; i++) {
  //   assertStrictEquals(CodePoint.fromUint16s([i]), i);
  // }
  // for (let i = 0x10000; i <= 0x10FFFF; i++) {
  //   const c = String.fromCodePoint(i);
  //   assertStrictEquals(
  //     CodePoint.fromUint16s([c.charCodeAt(0), c.charCodeAt(1)]),
  //     i,
  //   );
  // }

  assertThrows(
    () => {
      CodePoint.fromUint16s(0 as unknown as [number]);
    },
    TypeError,
    "Input must be an `Array` of 16-bit unsigned integers of type `number`",
  );

  assertThrows(
    () => {
      CodePoint.fromUint16s(["0"] as unknown as [number]);
    },
    TypeError,
    "Input must be an `Array` of 16-bit unsigned integers of type `number`",
  );

  assertThrows(
    () => {
      CodePoint.fromUint16s([-1]);
    },
    TypeError,
    "Input must be an `Array` of 16-bit unsigned integers of type `number`",
  );

  assertThrows(
    () => {
      CodePoint.fromUint16s([0x10000]);
    },
    TypeError,
    "Input must be an `Array` of 16-bit unsigned integers of type `number`",
  );

  assertThrows(
    () => {
      CodePoint.fromUint16s([]);
    },
    RangeError,
    "The length of Input must be 1 or greater",
  );

  assertThrows(
    () => {
      CodePoint.fromUint16s([0, 0, 0]);
    },
    RangeError,
    "The length of Input must be 2 or less",
  );

  assertThrows(
    () => {
      CodePoint.fromUint16s([0xDC00, 0xD800]);
    },
    RangeError,
    "When input is a pair of values, input must be a surrogate pair",
  );

  assertThrows(
    () => {
      CodePoint.fromUint16s([0x0031, 0x0031]);
    },
    RangeError,
    "When input is a pair of values, input must be a surrogate pair",
  );
});
