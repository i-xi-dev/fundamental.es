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

Deno.test("Numerics.Uint6.saturateFrom()", () => {
  assertStrictEquals(Numerics.Uint6.saturateFrom(0), 0);
  assertStrictEquals(Object.is(Numerics.Uint6.saturateFrom(-0), 0), true);
  assertStrictEquals(Numerics.Uint6.saturateFrom(1), 1);
  assertStrictEquals(Numerics.Uint6.saturateFrom(63), 63);
  assertStrictEquals(Numerics.Uint6.saturateFrom(64), 63);
  assertStrictEquals(Numerics.Uint6.saturateFrom(-1), 0);

  assertStrictEquals(Numerics.Uint6.saturateFrom(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Numerics.Uint6.saturateFrom(Number.MAX_SAFE_INTEGER), 63);

  assertThrows(
    () => {
      Numerics.Uint6.saturateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint6.saturateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint6.saturateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
