import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.fillRandom()", () => {
  const b = ByteSequence.create(64);
  b.loadUint8Iterable([1, 2, 3, 4]);
  b.fillRandom(2);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 6);
  assertStrictEquals(bytes[0], 1);
  assertStrictEquals(bytes[1], 2);
  assertStrictEquals(bytes[2], 3);
  assertStrictEquals(bytes[3], 4);
  assertStrictEquals((bytes[4] >= 0) && (bytes[4] <= 0xFF), true);
  assertStrictEquals((bytes[5] >= 0) && (bytes[5] <= 0xFF), true);

  const b2 = ByteSequence.create(64);
  b2.loadUint8Iterable([1, 2, 3, 4]);
  b2.fillRandom(0);
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 1);
  assertStrictEquals(bytes2[1], 2);
  assertStrictEquals(bytes2[2], 3);
  assertStrictEquals(bytes2[3], 4);

  const b3 = ByteSequence.create(64);
  b3.loadUint8Iterable([1, 2, 3, 4]);
  b3.fillRandom(2, { insertAt: 1 });
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 4);
  assertStrictEquals(bytes3[0], 1);
  assertStrictEquals((bytes3[1] >= 0) && (bytes3[1] <= 0xFF), true);
  assertStrictEquals((bytes3[2] >= 0) && (bytes3[2] <= 0xFF), true);
  assertStrictEquals(bytes3[3], 4);
});

Deno.test("ByteSequence.prototype.fillRandom() - error", () => {
  const b3 = ByteSequence.create(4);
  assertThrows(
    () => {
      b3.fillRandom("-1" as unknown as number);
    },
    TypeError,
    "Input must be a non-negative safe-integer of type `number`",
  );

  const b4 = ByteSequence.create(4);
  assertThrows(
    () => {
      b4.fillRandom(1, { insertAt: 100 });
    },
    RangeError,
    "Insertion position is out of range",
  );
});
