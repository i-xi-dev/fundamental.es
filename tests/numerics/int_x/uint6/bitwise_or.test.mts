import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testOr(a: number, b: number) {
  return Numerics.Uint6.bitwiseOr(a, b);
}

Deno.test("Numerics.Uint6.bitwiseOr()", () => {
  assertStrictEquals(testOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(testOr(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(testOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(testOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(testOr(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(testOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(testOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(testOr(0b0000_01, 0b0000_01), 0b0000_01);
});

Deno.test("Numerics.Uint6.bitwiseOr() - error", () => {
  assertThrows(
    () => {
      testOr(-1, 0);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testOr(0, -1);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testOr(0x40, 0);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testOr(0, 0x40);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
});
