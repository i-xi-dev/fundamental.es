import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testRL(a: number, o: number) {
  return Numerics.Uint16.rotateLeft(a, o);
}

Deno.test("Numerics.Uint16.rotateLeft()", () => {
  assertStrictEquals(testRL(0b10000000_00000000, 0), 0b10000000_00000000);
  assertStrictEquals(testRL(0b10000000_00000000, 1), 0b00000000_00000001);
  assertStrictEquals(testRL(0b10000000_00000000, 2), 0b00000000_00000010);
  assertStrictEquals(testRL(0b10000000_00000000, 3), 0b00000000_00000100);
  assertStrictEquals(testRL(0b10000000_00000000, 4), 0b00000000_00001000);
  assertStrictEquals(testRL(0b10000000_00000000, 5), 0b00000000_00010000);
  assertStrictEquals(testRL(0b10000000_00000000, 6), 0b00000000_00100000);
  assertStrictEquals(testRL(0b10000000_00000000, 7), 0b00000000_01000000);
  assertStrictEquals(testRL(0b10000000_00000000, 8), 0b00000000_10000000);
  assertStrictEquals(testRL(0b10000000_00000000, 9), 0b00000001_00000000);
  assertStrictEquals(testRL(0b10000000_00000000, 10), 0b00000010_00000000);
  assertStrictEquals(testRL(0b10000000_00000000, 11), 0b00000100_00000000);
  assertStrictEquals(testRL(0b10000000_00000000, 12), 0b00001000_00000000);
  assertStrictEquals(testRL(0b10000000_00000000, 13), 0b00010000_00000000);
  assertStrictEquals(testRL(0b10000000_00000000, 14), 0b00100000_00000000);
  assertStrictEquals(testRL(0b10000000_00000000, 15), 0b01000000_00000000);
  assertStrictEquals(testRL(0b10000000_00000000, 16), 0b10000000_00000000);

  assertStrictEquals(testRL(0b01111111_11111111, 0), 0b01111111_11111111);
  assertStrictEquals(testRL(0b01111111_11111111, 1), 0b11111111_11111110);
  assertStrictEquals(testRL(0b01111111_11111111, 2), 0b11111111_11111101);
  assertStrictEquals(testRL(0b01111111_11111111, 3), 0b11111111_11111011);
  assertStrictEquals(testRL(0b01111111_11111111, 4), 0b11111111_11110111);
  assertStrictEquals(testRL(0b01111111_11111111, 5), 0b11111111_11101111);
  assertStrictEquals(testRL(0b01111111_11111111, 6), 0b11111111_11011111);
  assertStrictEquals(testRL(0b01111111_11111111, 7), 0b11111111_10111111);
  assertStrictEquals(testRL(0b01111111_11111111, 8), 0b11111111_01111111);
  assertStrictEquals(testRL(0b01111111_11111111, 9), 0b11111110_11111111);
  assertStrictEquals(testRL(0b01111111_11111111, 10), 0b11111101_11111111);
  assertStrictEquals(testRL(0b01111111_11111111, 11), 0b11111011_11111111);
  assertStrictEquals(testRL(0b01111111_11111111, 12), 0b11110111_11111111);
  assertStrictEquals(testRL(0b01111111_11111111, 13), 0b11101111_11111111);
  assertStrictEquals(testRL(0b01111111_11111111, 14), 0b11011111_11111111);
  assertStrictEquals(testRL(0b01111111_11111111, 15), 0b10111111_11111111);
  assertStrictEquals(testRL(0b01111111_11111111, 16), 0b01111111_11111111);

  assertStrictEquals(testRL(0b00000000_00000001, -17), 0b10000000_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, -16), 0b00000000_00000001);
  assertStrictEquals(testRL(0b00000000_00000001, -1), 0b10000000_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, 0), 0b00000000_00000001);
  assertStrictEquals(testRL(0b00000000_00000001, 1), 0b00000000_00000010);
  assertStrictEquals(testRL(0b00000000_00000001, 2), 0b00000000_00000100);
  assertStrictEquals(testRL(0b00000000_00000001, 3), 0b00000000_00001000);
  assertStrictEquals(testRL(0b00000000_00000001, 4), 0b00000000_00010000);
  assertStrictEquals(testRL(0b00000000_00000001, 5), 0b00000000_00100000);
  assertStrictEquals(testRL(0b00000000_00000001, 6), 0b00000000_01000000);
  assertStrictEquals(testRL(0b00000000_00000001, 7), 0b00000000_10000000);
  assertStrictEquals(testRL(0b00000000_00000001, 8), 0b00000001_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, 9), 0b00000010_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, 10), 0b00000100_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, 11), 0b00001000_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, 12), 0b00010000_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, 13), 0b00100000_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, 14), 0b01000000_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, 15), 0b10000000_00000000);
  assertStrictEquals(testRL(0b00000000_00000001, 16), 0b00000000_00000001);
  assertStrictEquals(testRL(0b00000000_00000001, 17), 0b00000000_00000010);
  assertStrictEquals(testRL(0b00000000_00000001, 32), 0b00000000_00000001);
  assertStrictEquals(testRL(0b00000000_00000001, 33), 0b00000000_00000010);

  assertStrictEquals(testRL(0b11111111_11111111, 1), 0b11111111_11111111);

  assertStrictEquals(testRL(0, -1), 0);
  assertStrictEquals(testRL(0, 0), 0);
  assertStrictEquals(testRL(0, 1), 0);
  assertStrictEquals(testRL(0, 101), 0);
});

Deno.test("Numerics.Uint16.rotateLeft() - error", () => {
  assertThrows(
    () => {
      testRL(-1, 0);
    },
    TypeError,
    "Input must be a 16-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testRL(0x10000, 0);
    },
    TypeError,
    "Input must be a 16-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testRL(0, 0.5);
    },
    TypeError,
    "Offset must be a safe-integer of type `number`",
  );
});
