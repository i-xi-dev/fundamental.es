import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.Uint24.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint24.truncateFrom(-1), 16777215);
  assertStrictEquals(Numerics.Uint24.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint24.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint24.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint24.truncateFrom(128), 128);
  assertStrictEquals(Numerics.Uint24.truncateFrom(129), 129);
  assertStrictEquals(Numerics.Uint24.truncateFrom(256), 256);
  assertStrictEquals(Numerics.Uint24.truncateFrom(257), 257);
  assertStrictEquals(Numerics.Uint24.truncateFrom(512), 512);
  assertStrictEquals(Numerics.Uint24.truncateFrom(513), 513);
  assertStrictEquals(Numerics.Uint24.truncateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint24.truncateFrom(65536), 65536);
  assertStrictEquals(Numerics.Uint24.truncateFrom(65537), 65537);
  assertStrictEquals(Numerics.Uint24.truncateFrom(131071), 131071);
  assertStrictEquals(Numerics.Uint24.truncateFrom(131072), 131072);
  assertStrictEquals(Numerics.Uint24.truncateFrom(16777215), 16777215);
  assertStrictEquals(Numerics.Uint24.truncateFrom(16777216), 0);
  assertStrictEquals(Numerics.Uint24.truncateFrom(33554431), 16777215);
  assertStrictEquals(Numerics.Uint24.truncateFrom(33554432), 0);

  assertThrows(
    () => {
      Numerics.Uint24.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint24.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint24.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});

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
