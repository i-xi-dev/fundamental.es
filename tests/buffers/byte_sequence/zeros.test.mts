import { assertStrictEquals, assertThrows } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.zeros()", () => {
  const b = Buffers.ByteSequence.zeros(4);
  assertStrictEquals(b.resizable, false);
  assertStrictEquals(b.count, 4);
  assertStrictEquals(b.capacity, 4);
  assertStrictEquals(b.maxCapacity, 4);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0);
  assertStrictEquals(bytes[1], 0);
  assertStrictEquals(bytes[2], 0);
  assertStrictEquals(bytes[3], 0);

  const b2 = Buffers.ByteSequence.zeros(4, { maxCapacity: 6 });
  assertStrictEquals(b2.resizable, true);
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 0);
  assertStrictEquals(bytes2[1], 0);
  assertStrictEquals(bytes2[2], 0);
  assertStrictEquals(bytes2[3], 0);
});

Deno.test("Buffers.ByteSequence.zeros() - error", () => {
  assertThrows(
    () => {
      Buffers.ByteSequence.zeros("4" as unknown as number);
    },
    TypeError,
    "Input must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Buffers.ByteSequence.zeros(-1);
    },
    RangeError,
    "Input must be a `number` within the range of non-negative safe-integer",
  );
});
