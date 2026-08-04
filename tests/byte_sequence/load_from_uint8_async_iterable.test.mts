import { assertRejects, assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.loadFromUint8AsyncIterable()", async () => {
  async function* bs() {
    yield 255;
    yield 254;
    yield 253;
  }

  const b = ByteSequence.create(4);
  await b.loadFromUint8AsyncIterable(bs());
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 254);
  assertStrictEquals(bytes[2], 253);
});

Deno.test("ByteSequence.prototype.loadFromUint8AsyncIterable() - error", async () => {
  const b3 = ByteSequence.create(4);
  await assertRejects(
    async () => {
      await b3.loadFromUint8AsyncIterable(
        255 as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "Input must be an `AsyncIterable`",
  );
});

Deno.test("ByteSequence.prototype.loadFromUint8AsyncIterable() - insertAt", async () => {
  async function* bs() {
    yield 255;
    yield 254;
    yield 253;
  }

  const b = ByteSequence.create(8);
  await b.loadFromUint8AsyncIterable(bs());
  await b.loadFromUint8AsyncIterable(bs(), { insertAt: 1 });
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 255);
  assertStrictEquals(bytes[2], 254);
  assertStrictEquals(bytes[3], 253);
});
