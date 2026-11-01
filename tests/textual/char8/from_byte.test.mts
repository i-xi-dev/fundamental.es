import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char8 } = Textuals;

Deno.test("Textuals.Char8.fromByte()", () => {
  assertStrictEquals(Char8.fromByte(0), "\u0000");
  assertStrictEquals(Char8.fromByte(0xFF), "\u00FF");

  assertThrows(
    () => {
      Char8.fromByte(-1);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      Char8.fromByte(0x100);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );
});
