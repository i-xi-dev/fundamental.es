import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testRL(a: number, o: number) {
  return Numerics.Uint7.rotateLeft(a, o);
}

Deno.test("Numerics.Uint7.rotateLeft()", () => {
  assertStrictEquals(testRL(0b1000000, 0), 0b1000000);
  assertStrictEquals(testRL(0b1000000, 1), 0b0000001);
  assertStrictEquals(testRL(0b1000000, 2), 0b0000010);
  assertStrictEquals(testRL(0b1000000, 3), 0b0000100);
  assertStrictEquals(testRL(0b1000000, 4), 0b0001000);
  assertStrictEquals(testRL(0b1000000, 5), 0b0010000);
  assertStrictEquals(testRL(0b1000000, 6), 0b0100000);
  assertStrictEquals(testRL(0b1000000, 7), 0b1000000);

  assertStrictEquals(testRL(0b0111111, 0), 0b0111111);
  assertStrictEquals(testRL(0b0111111, 1), 0b1111110);
  assertStrictEquals(testRL(0b0111111, 2), 0b1111101);
  assertStrictEquals(testRL(0b0111111, 3), 0b1111011);
  assertStrictEquals(testRL(0b0111111, 4), 0b1110111);
  assertStrictEquals(testRL(0b0111111, 5), 0b1101111);
  assertStrictEquals(testRL(0b0111111, 6), 0b1011111);
  assertStrictEquals(testRL(0b0111111, 7), 0b0111111);

  assertStrictEquals(testRL(0b0000001, -1), 0b1000000);
  assertStrictEquals(testRL(0b0000001, 0), 0b0000001);
  assertStrictEquals(testRL(0b0000001, 1), 0b0000010);
  assertStrictEquals(testRL(0b0000001, 2), 0b0000100);
  assertStrictEquals(testRL(0b0000001, 3), 0b0001000);
  assertStrictEquals(testRL(0b0000001, 4), 0b0010000);
  assertStrictEquals(testRL(0b0000001, 5), 0b0100000);
  assertStrictEquals(testRL(0b0000001, 6), 0b1000000);
  assertStrictEquals(testRL(0b0000001, 7), 0b0000001);
  assertStrictEquals(testRL(0b0000001, 8), 0b0000010);

  assertStrictEquals(testRL(0b1111111, 1), 0b1111111);

  assertStrictEquals(testRL(0, -1), 0);
  assertStrictEquals(testRL(0, 0), 0);
  assertStrictEquals(testRL(0, 1), 0);
  assertStrictEquals(testRL(0, 101), 0);
});

Deno.test("Numerics.Uint7.rotateLeft() - error", () => {
  assertThrows(
    () => {
      testRL(-1, 0);
    },
    TypeError,
    "Input must be a 7-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testRL(0x80, 0);
    },
    TypeError,
    "Input must be a 7-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testRL(0, 0.5);
    },
    TypeError,
    "Offset must be a safe-integer of type `number`",
  );
});
