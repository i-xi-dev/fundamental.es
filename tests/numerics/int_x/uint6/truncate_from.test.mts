import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.Uint6.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint6.truncateFrom(-1), 63);
  assertStrictEquals(Numerics.Uint6.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint6.truncateFrom(32), 32);
  assertStrictEquals(Numerics.Uint6.truncateFrom(64), 0);
  assertStrictEquals(Numerics.Uint6.truncateFrom(65), 1);
  assertStrictEquals(Numerics.Uint6.truncateFrom(128), 0);
  assertStrictEquals(Numerics.Uint6.truncateFrom(129), 1);

  assertThrows(
    () => {
      Numerics.Uint6.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint6.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint6.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
