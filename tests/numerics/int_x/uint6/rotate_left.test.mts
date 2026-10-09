import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testRL(a: number, o: number) {
  return Numerics.Uint6.rotateLeft(a, o);
}

Deno.test("Numerics.Uint6.rotateLeft()", () => {
  assertStrictEquals(testRL(0b100000, 0), 0b100000);
  assertStrictEquals(testRL(0b100000, 1), 0b000001);
  assertStrictEquals(testRL(0b100000, 2), 0b000010);
  assertStrictEquals(testRL(0b100000, 3), 0b000100);
  assertStrictEquals(testRL(0b100000, 4), 0b001000);
  assertStrictEquals(testRL(0b100000, 5), 0b010000);
  assertStrictEquals(testRL(0b100000, 6), 0b100000);

  assertStrictEquals(testRL(0b011111, 0), 0b011111);
  assertStrictEquals(testRL(0b011111, 1), 0b111110);
  assertStrictEquals(testRL(0b011111, 2), 0b111101);
  assertStrictEquals(testRL(0b011111, 3), 0b111011);
  assertStrictEquals(testRL(0b011111, 4), 0b110111);
  assertStrictEquals(testRL(0b011111, 5), 0b101111);
  assertStrictEquals(testRL(0b011111, 6), 0b011111);

  assertStrictEquals(testRL(0b000001, -1), 0b100000);
  assertStrictEquals(testRL(0b000001, 0), 0b000001);
  assertStrictEquals(testRL(0b000001, 1), 0b000010);
  assertStrictEquals(testRL(0b000001, 2), 0b000100);
  assertStrictEquals(testRL(0b000001, 3), 0b001000);
  assertStrictEquals(testRL(0b000001, 4), 0b010000);
  assertStrictEquals(testRL(0b000001, 5), 0b100000);
  assertStrictEquals(testRL(0b000001, 6), 0b000001);
  assertStrictEquals(testRL(0b000001, 7), 0b000010);

  assertStrictEquals(testRL(0b111111, 1), 0b111111);

  assertStrictEquals(testRL(0, -1), 0);
  assertStrictEquals(testRL(0, 0), 0);
  assertStrictEquals(testRL(0, 1), 0);
  assertStrictEquals(testRL(0, 101), 0);
});

Deno.test("Numerics.Uint6.rotateLeft() - error", () => {
  assertThrows(
    () => {
      testRL(-1, 0);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testRL(0x40, 0);
    },
    TypeError,
    "Input must be a 6-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testRL(0, 0.5);
    },
    TypeError,
    "Offset must be a safe-integer of type `number`",
  );
});
