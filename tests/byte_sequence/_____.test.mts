import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.toArrayBufferWithDetach()", () => {
  const b = ByteSequence.create(4, 8);
  b.setByte(0xFF);
  b.setByte(0xFE);
  b.setByte(0xFD);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 0xFF);
  assertStrictEquals(bytes[1], 0xFE);
  assertStrictEquals(bytes[2], 0xFD);

  const b2 = ByteSequence.create(4, 8);
  b2.setByte(0xFF);
  b2.setByte(0xFE);
  b2.setByte(0xFD);
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach({ byteLength: 2 }));
  assertStrictEquals(bytes2.byteLength, 2);
  assertStrictEquals(bytes2.buffer.resizable, false);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xFE);
});

Deno.test("ByteSequence.prototype.toBytesWithDetach()", () => {
  const b = ByteSequence.create(4, 8);
  b.setByte(0xFF);
  b.setByte(0xFE);
  b.setByte(0xFD);
  const bytes = b.toBytesWithDetach();
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 0xFF);
  assertStrictEquals(bytes[1], 0xFE);
  assertStrictEquals(bytes[2], 0xFD);

  const b2 = ByteSequence.create(4, 8);
  b2.setByte(0xFF);
  b2.setByte(0xFE);
  b2.setByte(0xFD);
  const bytes2 = b2.toBytesWithDetach({ byteLength: 2 });
  assertStrictEquals(bytes2.byteLength, 2);
  assertStrictEquals(bytes2.buffer.resizable, false);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xFE);
});
