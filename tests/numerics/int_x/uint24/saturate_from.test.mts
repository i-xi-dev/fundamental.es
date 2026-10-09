import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.Uint24.saturateFrom()", () => {
  assertStrictEquals(Numerics.Uint24.saturateFrom(0), 0);
  assertStrictEquals(Object.is(Numerics.Uint24.saturateFrom(-0), 0), true);
  assertStrictEquals(Numerics.Uint24.saturateFrom(1), 1);
  assertStrictEquals(Numerics.Uint24.saturateFrom(63), 63);
  assertStrictEquals(Numerics.Uint24.saturateFrom(64), 64);
  assertStrictEquals(Numerics.Uint24.saturateFrom(127), 127);
  assertStrictEquals(Numerics.Uint24.saturateFrom(128), 128);
  assertStrictEquals(Numerics.Uint24.saturateFrom(255), 255);
  assertStrictEquals(Numerics.Uint24.saturateFrom(256), 256);
  assertStrictEquals(Numerics.Uint24.saturateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint24.saturateFrom(65536), 65536);
  assertStrictEquals(Numerics.Uint24.saturateFrom(16777215), 16777215);
  assertStrictEquals(Numerics.Uint24.saturateFrom(16777216), 16777215);
  assertStrictEquals(Numerics.Uint24.saturateFrom(-1), 0);

  assertStrictEquals(Numerics.Uint24.saturateFrom(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(
    Numerics.Uint24.saturateFrom(Number.MAX_SAFE_INTEGER),
    16777215,
  );

  assertThrows(
    () => {
      Numerics.Uint24.saturateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint24.saturateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint24.saturateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
