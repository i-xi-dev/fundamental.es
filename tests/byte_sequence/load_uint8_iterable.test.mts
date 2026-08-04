import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.loadUint8Iterable()", () => {
  const b = ByteSequence.create(4);
  b.loadUint8Iterable([255, 254, 253]);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 254);
  assertStrictEquals(bytes[2], 253);

  const b2 = ByteSequence.create(4);
  b2.loadUint8Iterable(Uint8Array.of(255, 254, 253));
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 3);
  assertStrictEquals(bytes2[0], 255);
  assertStrictEquals(bytes2[1], 254);
  assertStrictEquals(bytes2[2], 253);
});

Deno.test("ByteSequence.prototype.loadUint8Iterable() - error", () => {
  const b = ByteSequence.create(4);
  assertThrows(
    () => {
      b.loadUint8Iterable(["255", "254", "253"] as unknown as number[]);
    },
    TypeError,
    "Input must be a safe-integer of type `number`", //XXX 主語を変えたい
  );

  const b2 = ByteSequence.create(4);
  assertThrows(
    () => {
      b2.loadUint8Iterable("255" as unknown as number[]);
    },
    TypeError,
    "Input must be a safe-integer of type `number`", //XXX 主語を変えたい
  );

  const b3 = ByteSequence.create(4);
  assertThrows(
    () => {
      b3.loadUint8Iterable(255 as unknown as number[]);
    },
    TypeError,
    "Input must be an `Iterable`",
  );
});

Deno.test("ByteSequence.prototype.loadUint8Iterable() - insertAt", () => {
  const b = ByteSequence.create(8);
  b.loadUint8Iterable([255, 254, 253]);
  b.loadUint8Iterable([255, 254, 253], { insertAt: 1 });
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 255);
  assertStrictEquals(bytes[2], 254);
  assertStrictEquals(bytes[3], 253);

  const b2 = ByteSequence.create(8);
  b2.loadUint8Iterable(Uint8Array.of(255, 254, 253));
  assertThrows(
    () => {
      b2.loadUint8Iterable(Uint8Array.of(255, 254, 253), { insertAt: 10 });
    },
    RangeError,
    "Insertion position is out of range",
  );
});
