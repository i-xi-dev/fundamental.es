import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.loadFromUint32Iterable()", () => {
  const b = ByteSequence.create(8);
  b.loadFromUint32Iterable([0xFFF01234, 1]);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 8);
  assertStrictEquals(bytes[0], 0x34);
  assertStrictEquals(bytes[1], 0x12);
  assertStrictEquals(bytes[2], 0xF0);
  assertStrictEquals(bytes[3], 0xFF);
  assertStrictEquals(bytes[4], 1);
  assertStrictEquals(bytes[5], 0);
  assertStrictEquals(bytes[6], 0);
  assertStrictEquals(bytes[7], 0);

  const b2 = ByteSequence.create(8);
  b2.loadFromUint32Iterable([0xFFF01234, 1], { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 8);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x12);
  assertStrictEquals(bytes2[3], 0x34);
  assertStrictEquals(bytes2[4], 0);
  assertStrictEquals(bytes2[5], 0);
  assertStrictEquals(bytes2[6], 0);
  assertStrictEquals(bytes2[7], 1);

  const b3 = ByteSequence.create(8);
  b3.loadFromUint32Iterable([0xFFF01234, 1], { byteOrder: "little-endian" });
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 8);
  assertStrictEquals(bytes3[0], 0x34);
  assertStrictEquals(bytes3[1], 0x12);
  assertStrictEquals(bytes3[2], 0xF0);
  assertStrictEquals(bytes3[3], 0xFF);
  assertStrictEquals(bytes3[4], 1);
  assertStrictEquals(bytes3[5], 0);
  assertStrictEquals(bytes3[6], 0);
  assertStrictEquals(bytes3[7], 0);
});

Deno.test("ByteSequence.prototype.loadFromUint32Iterable() - error", () => {
  const b3 = ByteSequence.create(4);
  assertThrows(
    () => {
      b3.loadFromUint32Iterable(255 as unknown as number[]);
    },
    TypeError,
    "Input must be an `Iterable`",
  );

  const b4 = ByteSequence.create(4);
  assertThrows(
    () => {
      b4.loadFromUint32Iterable([255, "x" as unknown as number]);
    },
    TypeError,
    "Input must be a safe-integer of type `number`", //XXX 主語を変えたい
  );
});

Deno.test("ByteSequence.prototype.loadFromUint32Iterable() - insertAt", () => {
  const b = ByteSequence.create(64);
  b.loadFromUint32Iterable([0xFFF01234, 1]);
  b.loadFromUint32Iterable([0xFFF01234, 1], { insertAt: 1 });
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 9);
  assertStrictEquals(bytes[0], 0x34);
  assertStrictEquals(bytes[1], 0x34);
  assertStrictEquals(bytes[2], 0x12);
  assertStrictEquals(bytes[3], 0xF0);
  assertStrictEquals(bytes[4], 0xFF);
  assertStrictEquals(bytes[5], 1);
  assertStrictEquals(bytes[6], 0);
  assertStrictEquals(bytes[7], 0);
  assertStrictEquals(bytes[8], 0);
});
