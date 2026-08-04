import { assertRejects, assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.loadFromBigUint64AsyncIterable()", async () => {
  async function* bs() {
    yield 0xFFF0123466554433n;
    yield 1n;
  }

  const b = ByteSequence.create(16);
  await b.loadFromBigUint64AsyncIterable(bs());
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 16);
  assertStrictEquals(bytes[0], 0x33);
  assertStrictEquals(bytes[1], 0x44);
  assertStrictEquals(bytes[2], 0x55);
  assertStrictEquals(bytes[3], 0x66);
  assertStrictEquals(bytes[4], 0x34);
  assertStrictEquals(bytes[5], 0x12);
  assertStrictEquals(bytes[6], 0xF0);
  assertStrictEquals(bytes[7], 0xFF);
  assertStrictEquals(bytes[8], 1);
  assertStrictEquals(bytes[9], 0);
  assertStrictEquals(bytes[10], 0);
  assertStrictEquals(bytes[11], 0);
  assertStrictEquals(bytes[12], 0);
  assertStrictEquals(bytes[13], 0);
  assertStrictEquals(bytes[14], 0);
  assertStrictEquals(bytes[15], 0);

  const b2 = ByteSequence.create(16);
  await b2.loadFromBigUint64AsyncIterable(bs(), { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 16);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x12);
  assertStrictEquals(bytes2[3], 0x34);
  assertStrictEquals(bytes2[4], 0x66);
  assertStrictEquals(bytes2[5], 0x55);
  assertStrictEquals(bytes2[6], 0x44);
  assertStrictEquals(bytes2[7], 0x33);
  assertStrictEquals(bytes2[8], 0);
  assertStrictEquals(bytes2[9], 0);
  assertStrictEquals(bytes2[10], 0);
  assertStrictEquals(bytes2[11], 0);
  assertStrictEquals(bytes2[12], 0);
  assertStrictEquals(bytes2[13], 0);
  assertStrictEquals(bytes2[14], 0);
  assertStrictEquals(bytes2[15], 1);

  const b3 = ByteSequence.create(16);
  await b3.loadFromBigUint64AsyncIterable(bs(), { byteOrder: "little-endian" });
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 16);
  assertStrictEquals(bytes3[0], 0x33);
  assertStrictEquals(bytes3[1], 0x44);
  assertStrictEquals(bytes3[2], 0x55);
  assertStrictEquals(bytes3[3], 0x66);
  assertStrictEquals(bytes3[4], 0x34);
  assertStrictEquals(bytes3[5], 0x12);
  assertStrictEquals(bytes3[6], 0xF0);
  assertStrictEquals(bytes3[7], 0xFF);
  assertStrictEquals(bytes3[8], 1);
  assertStrictEquals(bytes3[9], 0);
  assertStrictEquals(bytes3[10], 0);
  assertStrictEquals(bytes3[11], 0);
  assertStrictEquals(bytes3[12], 0);
  assertStrictEquals(bytes3[13], 0);
  assertStrictEquals(bytes3[14], 0);
  assertStrictEquals(bytes3[15], 0);
});

Deno.test("ByteSequence.prototype.loadFromBigUint64AsyncIterable() - error", async () => {
  const b3 = ByteSequence.create(16);
  await assertRejects(
    async () => {
      await b3.loadFromBigUint64AsyncIterable(
        255 as unknown as AsyncIterable<bigint>,
      );
    },
    TypeError,
    "Input must be an `AsyncIterable`",
  );
});

Deno.test("ByteSequence.prototype.loadFromBigUint64AsyncIterable() - insertAt", async () => {
  async function* bs() {
    yield 0xFFF0123466554433n;
    yield 1n;
  }

  const b = ByteSequence.create(64);
  await b.loadFromBigUint64AsyncIterable(bs());
  await b.loadFromBigUint64AsyncIterable(bs(), { insertAt: 1 });
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 17);
  assertStrictEquals(bytes[0], 0x33);
  assertStrictEquals(bytes[1], 0x33);
  assertStrictEquals(bytes[2], 0x44);
  assertStrictEquals(bytes[3], 0x55);
  assertStrictEquals(bytes[4], 0x66);
  assertStrictEquals(bytes[5], 0x34);
  assertStrictEquals(bytes[6], 0x12);
  assertStrictEquals(bytes[7], 0xF0);
  assertStrictEquals(bytes[8], 0xFF);
  assertStrictEquals(bytes[9], 1);
  assertStrictEquals(bytes[10], 0);
  assertStrictEquals(bytes[11], 0);
  assertStrictEquals(bytes[12], 0);
  assertStrictEquals(bytes[13], 0);
  assertStrictEquals(bytes[14], 0);
  assertStrictEquals(bytes[15], 0);
  assertStrictEquals(bytes[16], 0);
});
