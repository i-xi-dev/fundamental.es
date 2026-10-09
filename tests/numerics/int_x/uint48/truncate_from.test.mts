import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.Uint48.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint48.truncateFrom(-1), 281474976710655);
  assertStrictEquals(Numerics.Uint48.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint48.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint48.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint48.truncateFrom(128), 128);
  assertStrictEquals(Numerics.Uint48.truncateFrom(129), 129);
  assertStrictEquals(Numerics.Uint48.truncateFrom(256), 256);
  assertStrictEquals(Numerics.Uint48.truncateFrom(257), 257);
  assertStrictEquals(Numerics.Uint48.truncateFrom(512), 512);
  assertStrictEquals(Numerics.Uint48.truncateFrom(513), 513);
  assertStrictEquals(Numerics.Uint48.truncateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint48.truncateFrom(65536), 65536);
  assertStrictEquals(Numerics.Uint48.truncateFrom(65537), 65537);
  assertStrictEquals(Numerics.Uint48.truncateFrom(131071), 131071);
  assertStrictEquals(Numerics.Uint48.truncateFrom(131072), 131072);
  assertStrictEquals(Numerics.Uint48.truncateFrom(16777215), 16777215);
  assertStrictEquals(Numerics.Uint48.truncateFrom(16777216), 16777216);
  assertStrictEquals(Numerics.Uint48.truncateFrom(33554431), 33554431);
  assertStrictEquals(Numerics.Uint48.truncateFrom(33554432), 33554432);
  assertStrictEquals(
    Numerics.Uint48.truncateFrom(281474976710655),
    281474976710655,
  );
  assertStrictEquals(Numerics.Uint48.truncateFrom(281474976710656), 0);
  assertStrictEquals(
    Numerics.Uint48.truncateFrom(562949953421311),
    281474976710655,
  );
  assertStrictEquals(Numerics.Uint48.truncateFrom(562949953421312), 0);

  assertThrows(
    () => {
      Numerics.Uint48.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint48.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint48.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
