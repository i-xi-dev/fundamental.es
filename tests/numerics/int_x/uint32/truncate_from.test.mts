import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.Uint32.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint32.truncateFrom(-1), 4294967295);
  assertStrictEquals(Numerics.Uint32.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint32.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint32.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint32.truncateFrom(128), 128);
  assertStrictEquals(Numerics.Uint32.truncateFrom(129), 129);
  assertStrictEquals(Numerics.Uint32.truncateFrom(256), 256);
  assertStrictEquals(Numerics.Uint32.truncateFrom(257), 257);
  assertStrictEquals(Numerics.Uint32.truncateFrom(512), 512);
  assertStrictEquals(Numerics.Uint32.truncateFrom(513), 513);
  assertStrictEquals(Numerics.Uint32.truncateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint32.truncateFrom(65536), 65536);
  assertStrictEquals(Numerics.Uint32.truncateFrom(65537), 65537);
  assertStrictEquals(Numerics.Uint32.truncateFrom(131071), 131071);
  assertStrictEquals(Numerics.Uint32.truncateFrom(131072), 131072);
  assertStrictEquals(Numerics.Uint32.truncateFrom(16777215), 16777215);
  assertStrictEquals(Numerics.Uint32.truncateFrom(16777216), 16777216);
  assertStrictEquals(Numerics.Uint32.truncateFrom(33554431), 33554431);
  assertStrictEquals(Numerics.Uint32.truncateFrom(33554432), 33554432);
  assertStrictEquals(Numerics.Uint32.truncateFrom(4294967295), 4294967295);
  assertStrictEquals(Numerics.Uint32.truncateFrom(4294967296), 0);
  assertStrictEquals(Numerics.Uint32.truncateFrom(8589934591), 4294967295);
  assertStrictEquals(Numerics.Uint32.truncateFrom(8589934592), 0);

  assertThrows(
    () => {
      Numerics.Uint32.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint32.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint32.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
