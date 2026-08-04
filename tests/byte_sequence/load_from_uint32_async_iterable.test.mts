import { assertRejects, assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.loadFromUint32AsyncIterable()", async () => {
  async function* bs() {
    yield 0xFFF01234;
    yield 1;
  }

  const b = ByteSequence.create(8);
  await b.loadFromUint32AsyncIterable(bs());
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
  await b2.loadFromUint32AsyncIterable(bs(), { byteOrder: "big-endian" });
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
  await b3.loadFromUint32AsyncIterable(bs(), { byteOrder: "little-endian" });
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

Deno.test("ByteSequence.prototype.loadFromUint32AsyncIterable() - error", async () => {
  const b3 = ByteSequence.create(4);
  await assertRejects(
    async () => {
      await b3.loadFromUint32AsyncIterable(
        255 as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "Input must be an `AsyncIterable`",
  );
});

Deno.test("ByteSequence.prototype.loadFromUint32AsyncIterable() - insertAt", async () => {
  async function* bs() {
    yield 0xFFF01234;
    yield 1;
  }

  const b = ByteSequence.create(64);
  await b.loadFromUint32AsyncIterable(bs());
  await b.loadFromUint32AsyncIterable(bs(), { insertAt: 1 });
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
