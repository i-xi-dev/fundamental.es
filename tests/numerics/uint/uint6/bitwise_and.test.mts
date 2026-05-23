import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testAnd(a: number, b: number) {
  return Numerics.Uint6.bitwiseAnd(a, b);
}

Deno.test("Numerics.Uint6.bitwiseAnd()", () => {
  assertStrictEquals(testAnd(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(testAnd(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(testAnd(0b0000_00, 0b1111_11), 0b0000_00);
  assertStrictEquals(testAnd(0b1111_11, 0b0000_00), 0b0000_00);

  assertStrictEquals(testAnd(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(testAnd(0b0000_01, 0b1000_00), 0b0000_00);
  assertStrictEquals(testAnd(0b1000_00, 0b0000_01), 0b0000_00);
  assertStrictEquals(testAnd(0b0000_01, 0b0000_01), 0b0000_01);
});

Deno.test("Numerics.Uint6.bitwiseAnd() - error", () => {
  assertThrows(
    () => {
      testAnd(-1, 0);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testAnd(0, -1);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testAnd(0x40, 0);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testAnd(0, 0x40);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
});
