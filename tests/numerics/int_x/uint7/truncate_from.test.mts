import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.Uint7.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint7.truncateFrom(-1), 127);
  assertStrictEquals(Numerics.Uint7.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint7.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint7.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint7.truncateFrom(128), 0);
  assertStrictEquals(Numerics.Uint7.truncateFrom(129), 1);
  assertStrictEquals(Numerics.Uint7.truncateFrom(256), 0);
  assertStrictEquals(Numerics.Uint7.truncateFrom(257), 1);

  assertThrows(
    () => {
      Numerics.Uint7.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint7.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint7.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
