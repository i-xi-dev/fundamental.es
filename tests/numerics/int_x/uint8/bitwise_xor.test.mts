import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testXOr(a: number, b: number) {
  return Numerics.Uint8.bitwiseXOr(a, b);
}

Deno.test("Numerics.Uint8.bitwiseXOr()", () => {
  assertStrictEquals(testXOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(testXOr(0b1111_11, 0b1111_11), 0b0000_00);
  assertStrictEquals(testXOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(testXOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(testXOr(0b1000_00, 0b1000_00), 0b0000_00);
  assertStrictEquals(testXOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(testXOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(testXOr(0b0000_01, 0b0000_01), 0b0000_00);

  assertStrictEquals(testXOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(testXOr(0b1111_111, 0b1111_111), 0b0000_000);
  assertStrictEquals(testXOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(testXOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(testXOr(0b1000_000, 0b1000_000), 0b0000_000);
  assertStrictEquals(testXOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(testXOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(testXOr(0b0000_001, 0b0000_001), 0b0000_000);

  assertStrictEquals(testXOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(testXOr(0b1111_1111, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(testXOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(testXOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(testXOr(0b1000_0000, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(testXOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(testXOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(testXOr(0b0000_0001, 0b0000_0001), 0b0000_0000);
});

Deno.test("Numerics.Uint8.bitwiseXOr() - error", () => {
  assertThrows(
    () => {
      testXOr(-1, 0);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testXOr(0, -1);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testXOr(0x100, 0);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testXOr(0, 0x100);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );
});
