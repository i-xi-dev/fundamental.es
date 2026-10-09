import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.Uint16.truncateFrom()", () => {
  assertStrictEquals(Numerics.Uint16.truncateFrom(-1), 65535);
  assertStrictEquals(Numerics.Uint16.truncateFrom(0), 0);
  assertStrictEquals(Numerics.Uint16.truncateFrom(64), 64);
  assertStrictEquals(Numerics.Uint16.truncateFrom(65), 65);
  assertStrictEquals(Numerics.Uint16.truncateFrom(128), 128);
  assertStrictEquals(Numerics.Uint16.truncateFrom(129), 129);
  assertStrictEquals(Numerics.Uint16.truncateFrom(256), 256);
  assertStrictEquals(Numerics.Uint16.truncateFrom(257), 257);
  assertStrictEquals(Numerics.Uint16.truncateFrom(512), 512);
  assertStrictEquals(Numerics.Uint16.truncateFrom(513), 513);
  assertStrictEquals(Numerics.Uint16.truncateFrom(65535), 65535);
  assertStrictEquals(Numerics.Uint16.truncateFrom(65536), 0);
  assertStrictEquals(Numerics.Uint16.truncateFrom(65537), 1);
  assertStrictEquals(Numerics.Uint16.truncateFrom(131071), 65535);
  assertStrictEquals(Numerics.Uint16.truncateFrom(131072), 0);

  assertThrows(
    () => {
      Numerics.Uint16.truncateFrom(0n as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint16.truncateFrom("1" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      Numerics.Uint16.truncateFrom(undefined as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
});
