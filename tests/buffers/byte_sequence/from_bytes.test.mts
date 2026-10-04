import { assertStrictEquals, assertThrows } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.fromBytes()", () => {
  const testdata = Uint8Array.of(255, 254, 253);

  const b = Buffers.ByteSequence.fromBytes(testdata);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 254);
  assertStrictEquals(bytes[2], 253);

  const testdata2 = Uint8Array.of(255, 254, 253, 252);

  const b2 = Buffers.ByteSequence.fromBytes(testdata2);
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 255);
  assertStrictEquals(bytes2[1], 254);
  assertStrictEquals(bytes2[2], 253);
  assertStrictEquals(bytes2[3], 252);

  const testdata3 = Uint8Array.of(255, 254, 253, 252, 251);

  const b3 = Buffers.ByteSequence.fromBytes(testdata3);
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 5);
  assertStrictEquals(bytes3[0], 255);
  assertStrictEquals(bytes3[1], 254);
  assertStrictEquals(bytes3[2], 253);
  assertStrictEquals(bytes3[3], 252);
  assertStrictEquals(bytes3[4], 251);
});

Deno.test("Buffers.ByteSequence.fromBytes() - resizable", () => {
  const testdata = Uint8Array.of(255, 254, 253);

  const b = Buffers.ByteSequence.fromBytes(testdata, { maxCapacity: 6 });
  b.loadFromArrayBuffer(testdata.buffer);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 6);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 254);
  assertStrictEquals(bytes[2], 253);
  assertStrictEquals(bytes[3], 255);
  assertStrictEquals(bytes[4], 254);
  assertStrictEquals(bytes[5], 253);
});

Deno.test("Buffers.ByteSequence.fromBytes() - error", () => {
  assertThrows(
    () => {
      Buffers.ByteSequence.fromBytes(
        [255] as unknown as Uint8Array<ArrayBuffer>,
      );
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      const bs = Buffers.ByteSequence.fromBytes(Uint8Array.of(255, 254, 253));
      bs.loadFromArrayBuffer(Uint8Array.of(255, 254, 253).buffer);
    },
    RangeError,
    "`ArrayBuffer` cannot be resized",
  );
});
