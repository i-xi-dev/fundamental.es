import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.Uint7.saturateFrom()", () => {
  assertStrictEquals(Numerics.Uint7.saturateFrom(0), 0);
  assertStrictEquals(Object.is(Numerics.Uint7.saturateFrom(-0), 0), true);
  assertStrictEquals(Numerics.Uint7.saturateFrom(1), 1);
  assertStrictEquals(Numerics.Uint7.saturateFrom(63), 63);
  assertStrictEquals(Numerics.Uint7.saturateFrom(64), 64);
  assertStrictEquals(Numerics.Uint7.saturateFrom(127), 127);
  assertStrictEquals(Numerics.Uint7.saturateFrom(128), 127);
  assertStrictEquals(Numerics.Uint7.saturateFrom(-1), 0);

  assertStrictEquals(Numerics.Uint7.saturateFrom(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Numerics.Uint7.saturateFrom(Number.MAX_SAFE_INTEGER), 127);

  assertThrows(
    () => {
      Numerics.Uint7.saturateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint7.saturateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint7.saturateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
