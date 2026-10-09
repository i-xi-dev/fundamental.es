import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testRL(a: number, o: number) {
  return Numerics.Uint8.rotateLeft(a, o);
}

Deno.test("Numerics.Uint8.rotateLeft()", () => {
  assertStrictEquals(testRL(0b10000000, 0), 0b10000000);
  assertStrictEquals(testRL(0b10000000, 1), 0b00000001);
  assertStrictEquals(testRL(0b10000000, 2), 0b00000010);
  assertStrictEquals(testRL(0b10000000, 3), 0b00000100);
  assertStrictEquals(testRL(0b10000000, 4), 0b00001000);
  assertStrictEquals(testRL(0b10000000, 5), 0b00010000);
  assertStrictEquals(testRL(0b10000000, 6), 0b00100000);
  assertStrictEquals(testRL(0b10000000, 7), 0b01000000);
  assertStrictEquals(testRL(0b10000000, 8), 0b10000000);

  assertStrictEquals(testRL(0b01111111, 0), 0b01111111);
  assertStrictEquals(testRL(0b01111111, 1), 0b11111110);
  assertStrictEquals(testRL(0b01111111, 2), 0b11111101);
  assertStrictEquals(testRL(0b01111111, 3), 0b11111011);
  assertStrictEquals(testRL(0b01111111, 4), 0b11110111);
  assertStrictEquals(testRL(0b01111111, 5), 0b11101111);
  assertStrictEquals(testRL(0b01111111, 6), 0b11011111);
  assertStrictEquals(testRL(0b01111111, 7), 0b10111111);
  assertStrictEquals(testRL(0b01111111, 8), 0b01111111);

  assertStrictEquals(testRL(0b00000001, -9), 0b10000000);
  assertStrictEquals(testRL(0b00000001, -8), 0b00000001);
  assertStrictEquals(testRL(0b00000001, -1), 0b10000000);
  assertStrictEquals(testRL(0b00000001, 0), 0b00000001);
  assertStrictEquals(testRL(0b00000001, 1), 0b00000010);
  assertStrictEquals(testRL(0b00000001, 2), 0b00000100);
  assertStrictEquals(testRL(0b00000001, 3), 0b00001000);
  assertStrictEquals(testRL(0b00000001, 4), 0b00010000);
  assertStrictEquals(testRL(0b00000001, 5), 0b00100000);
  assertStrictEquals(testRL(0b00000001, 6), 0b01000000);
  assertStrictEquals(testRL(0b00000001, 7), 0b10000000);
  assertStrictEquals(testRL(0b00000001, 8), 0b00000001);
  assertStrictEquals(testRL(0b00000001, 9), 0b00000010);
  assertStrictEquals(testRL(0b00000001, 16), 0b00000001);
  assertStrictEquals(testRL(0b00000001, 17), 0b00000010);

  assertStrictEquals(testRL(0b11111111, 1), 0b11111111);

  assertStrictEquals(testRL(0, -1), 0);
  assertStrictEquals(testRL(0, 0), 0);
  assertStrictEquals(testRL(0, 1), 0);
  assertStrictEquals(testRL(0, 101), 0);
});

Deno.test("Numerics.Uint8.rotateLeft() - error", () => {
  assertThrows(
    () => {
      testRL(-1, 0);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testRL(0x100, 0);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testRL(0, 0.5);
    },
    TypeError,
    "Offset must be a safe-integer of type `number`",
  );
});
