import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.loadFromArrayBuffer()", () => {
  const testdata = Uint8Array.of(255, 254, 253);

  const b = ByteSequence.create(4);
  b.loadFromArrayBuffer(testdata.buffer);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 254);
  assertStrictEquals(bytes[2], 253);

  const testdata2 = Uint8Array.of(255, 254, 253, 252);

  const b2 = ByteSequence.create(4);
  b2.loadFromArrayBuffer(testdata2.buffer);
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 255);
  assertStrictEquals(bytes2[1], 254);
  assertStrictEquals(bytes2[2], 253);
  assertStrictEquals(bytes2[3], 252);

  const testdata3 = Uint8Array.of(255, 254, 253, 252, 251);

  const b3 = ByteSequence.create(0, 10);
  b3.loadFromArrayBuffer(testdata3.buffer);
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 5);
  assertStrictEquals(bytes3[0], 255);
  assertStrictEquals(bytes3[1], 254);
  assertStrictEquals(bytes3[2], 253);
  assertStrictEquals(bytes3[3], 252);
  assertStrictEquals(bytes3[4], 251);
});

Deno.test("ByteSequence.prototype.loadFromArrayBuffer() - error", () => {
  const b = ByteSequence.create(4);
  assertThrows(
    () => {
      const testdata = Uint8Array.of(255, 254, 253, 252, 251);
      b.loadFromArrayBuffer(testdata.buffer);
    },
    RangeError,
    "`ArrayBuffer` cannot be resized",
  );

  const b2 = ByteSequence.create(4);
  assertThrows(
    () => {
      b.loadFromArrayBuffer([255] as unknown as ArrayBuffer);
    },
    TypeError,
    "Input must be an `ArrayBuffer`",
  );
});

Deno.test("ByteSequence.prototype.loadFromArrayBuffer() - insertAt", () => {
  const testdata = Uint8Array.of(255, 254, 253);

  const b = ByteSequence.create(24);
  b.loadFromArrayBuffer(testdata.buffer);
  assertThrows(
    () => {
      b.loadFromArrayBuffer(testdata.buffer, { insertAt: -1 });
    },
    RangeError,
    "Insertion position is out of range",
  );

  const b2 = ByteSequence.create(24);
  b2.loadFromArrayBuffer(testdata.buffer);
  assertThrows(
    () => {
      b2.loadFromArrayBuffer(testdata.buffer, { insertAt: 100 });
    },
    RangeError,
    "Insertion position is out of range",
  );

  const b3 = ByteSequence.create(24);
  b3.loadFromArrayBuffer(testdata.buffer);
  b3.loadFromArrayBuffer(testdata.buffer, { insertAt: 1 });
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 4);
  assertStrictEquals(bytes3[0], 255);
  assertStrictEquals(bytes3[1], 255);
  assertStrictEquals(bytes3[2], 254);
  assertStrictEquals(bytes3[3], 253);

  const b4 = ByteSequence.create(24);
  b4.loadFromArrayBuffer(testdata.buffer);
  b4.loadFromArrayBuffer(testdata.buffer, { insertAt: 1 });
  b4.setByte(0x01);
  const bytes4 = new Uint8Array(b4.toArrayBufferWithDetach());
  assertStrictEquals(bytes4.byteLength, 5);
  assertStrictEquals(bytes4[0], 255);
  assertStrictEquals(bytes4[1], 255);
  assertStrictEquals(bytes4[2], 254);
  assertStrictEquals(bytes4[3], 253);
  assertStrictEquals(bytes4[4], 1);
});
