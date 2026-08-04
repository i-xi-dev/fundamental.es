import { assertRejects, assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.loadUint16AsyncIterable()", async () => {
  async function* bs() {
    yield 0xFFF0;
    yield 0x0033;
  }

  const b = ByteSequence.create(4);
  await b.loadUint16AsyncIterable(bs());
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0xF0);
  assertStrictEquals(bytes[1], 0xFF);
  assertStrictEquals(bytes[2], 0x33);
  assertStrictEquals(bytes[3], 0x00);

  const b2 = ByteSequence.create(4);
  await b2.loadUint16AsyncIterable(bs(), { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x00);
  assertStrictEquals(bytes2[3], 0x33);

  const b3 = ByteSequence.create(4);
  await b3.loadUint16AsyncIterable(bs(), { byteOrder: "little-endian" });
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 4);
  assertStrictEquals(bytes3[0], 0xF0);
  assertStrictEquals(bytes3[1], 0xFF);
  assertStrictEquals(bytes3[2], 0x33);
  assertStrictEquals(bytes3[3], 0x00);
});

Deno.test("ByteSequence.prototype.loadUint16AsyncIterable() - error", async () => {
  const b3 = ByteSequence.create(4);
  await assertRejects(
    async () => {
      await b3.loadUint16AsyncIterable(255 as unknown as AsyncIterable<number>);
    },
    TypeError,
    "Input must be an `AsyncIterable`",
  );
});

Deno.test("ByteSequence.prototype.loadUint16AsyncIterable() - insertAt", async () => {
  async function* bs() {
    yield 0xFFF0;
    yield 0x0033;
  }

  const b = ByteSequence.create(64);
  await b.loadUint16AsyncIterable(bs());
  await b.loadUint16AsyncIterable(bs(), { insertAt: 1 });
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 5);
  assertStrictEquals(bytes[0], 0xF0);
  assertStrictEquals(bytes[1], 0xF0);
  assertStrictEquals(bytes[2], 0xFF);
  assertStrictEquals(bytes[3], 0x33);
  assertStrictEquals(bytes[4], 0x00);
});
