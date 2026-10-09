import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.Uint8.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint8.truncateFrom(-1), 255);
  assertStrictEquals(Numerics.Uint8.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint8.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint8.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint8.truncateFrom(128), 128);
  assertStrictEquals(Numerics.Uint8.truncateFrom(129), 129);
  assertStrictEquals(Numerics.Uint8.truncateFrom(256), 0);
  assertStrictEquals(Numerics.Uint8.truncateFrom(257), 1);
  assertStrictEquals(Numerics.Uint8.truncateFrom(512), 0);
  assertStrictEquals(Numerics.Uint8.truncateFrom(513), 1);

  assertThrows(
    () => {
      Numerics.Uint8.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint8.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint8.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
