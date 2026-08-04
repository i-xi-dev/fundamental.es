import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.fillZeros()", () => {
  const b = ByteSequence.create(64);
  b.loadFromUint8Iterable([1, 2, 3, 4]);
  b.fillZeros(2);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 6);
  assertStrictEquals(bytes[0], 1);
  assertStrictEquals(bytes[1], 2);
  assertStrictEquals(bytes[2], 3);
  assertStrictEquals(bytes[3], 4);
  assertStrictEquals(bytes[4], 0);
  assertStrictEquals(bytes[5], 0);

  const b2 = ByteSequence.create(64);
  b2.loadFromUint8Iterable([1, 2, 3, 4]);
  b2.fillZeros(0);
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 1);
  assertStrictEquals(bytes2[1], 2);
  assertStrictEquals(bytes2[2], 3);
  assertStrictEquals(bytes2[3], 4);

  const b3 = ByteSequence.create(64);
  b3.loadFromUint8Iterable([1, 2, 3, 4]);
  b3.fillZeros(2, { insertAt: 1 });
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 4);
  assertStrictEquals(bytes3[0], 1);
  assertStrictEquals(bytes3[1], 0);
  assertStrictEquals(bytes3[2], 0);
  assertStrictEquals(bytes3[3], 4);
});

Deno.test("ByteSequence.prototype.fillZeros() - error", () => {
  const b3 = ByteSequence.create(4);
  assertThrows(
    () => {
      b3.fillZeros("-1" as unknown as number);
    },
    TypeError,
    "Input must be a non-negative safe-integer of type `number`",
  );

  const b4 = ByteSequence.create(4);
  assertThrows(
    () => {
      b4.fillZeros(1, { insertAt: 100 });
    },
    RangeError,
    "Insertion position is out of range",
  );
});
