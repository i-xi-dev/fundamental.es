import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testXOr(a: number, b: number) {
  return Numerics.Uint6.bitwiseXOr(a, b);
}

Deno.test("Numerics.Uint6.bitwiseXOr()", () => {
  assertStrictEquals(testXOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(testXOr(0b1111_11, 0b1111_11), 0b0000_00);
  assertStrictEquals(testXOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(testXOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(testXOr(0b1000_00, 0b1000_00), 0b0000_00);
  assertStrictEquals(testXOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(testXOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(testXOr(0b0000_01, 0b0000_01), 0b0000_00);
});

Deno.test("Numerics.Uint6.bitwiseXOr() - error", () => {
  assertThrows(
    () => {
      testXOr(-1, 0);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testXOr(0, -1);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testXOr(0x40, 0);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testXOr(0, 0x40);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
});
