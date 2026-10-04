import { assertStrictEquals, assertThrows } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.byteAt()", () => {
  const b = Buffers.ByteSequence.create(0);

  assertThrows(
    () => {
      b.byteAt("0" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );
  assertThrows(
    () => {
      b.byteAt(-1);
    },
    RangeError,
    "Input must be 0 or greater",
  );
  assertThrows(
    () => {
      b.byteAt(1);
    },
    RangeError,
    "Input must be 0 or less",
  );

  const b2 = Buffers.ByteSequence.zeros(4);
  assertStrictEquals(b2.byteAt(0), 0);
  assertStrictEquals(b2.byteAt(1), 0);
  assertStrictEquals(b2.byteAt(2), 0);
  assertStrictEquals(b2.byteAt(3), 0);
});
