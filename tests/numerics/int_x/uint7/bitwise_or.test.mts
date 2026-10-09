import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testOr(a: number, b: number) {
  return Numerics.Uint7.bitwiseOr(a, b);
}

Deno.test("Numerics.Uint7.bitwiseOr()", () => {
  assertStrictEquals(testOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(testOr(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(testOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(testOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(testOr(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(testOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(testOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(testOr(0b0000_01, 0b0000_01), 0b0000_01);

  assertStrictEquals(testOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(testOr(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(testOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(testOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(testOr(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(testOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(testOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(testOr(0b0000_001, 0b0000_001), 0b0000_001);
});

Deno.test("Numerics.Uint7.bitwiseOr() - error", () => {
  assertThrows(
    () => {
      testOr(-1, 0);
    },
    TypeError,
    "Input must be a 7-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testOr(0, -1);
    },
    TypeError,
    "Input must be a 7-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testOr(0x80, 0);
    },
    TypeError,
    "Input must be a 7-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testOr(0, 0x80);
    },
    TypeError,
    "Input must be a 7-bit unsigned integer of type `number`",
  );
});
