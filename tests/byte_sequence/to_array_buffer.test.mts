import { assertNotStrictEquals, assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.toArrayBuffer()", () => {
  const bs1 = ByteSequence.create(64);
  bs1.loadUint8Iterable(Uint8Array.of(255, 0, 127, 1));

  const ab1a = bs1.toArrayBuffer();
  const ab1b = bs1.toArrayBuffer();
  assertNotStrictEquals(ab1a, ab1b);

  assertStrictEquals(ab1a.byteLength, 4);
  assertStrictEquals(ab1b.byteLength, 4);

  const ab1ab = new Uint8Array(ab1a);
  const ab1bb = new Uint8Array(ab1b);

  assertStrictEquals(ab1ab[0], 255);
  assertStrictEquals(ab1bb[0], 255);
  assertStrictEquals(ab1ab[1], 0);
  assertStrictEquals(ab1bb[1], 0);
  assertStrictEquals(ab1ab[2], 127);
  assertStrictEquals(ab1bb[2], 127);
  assertStrictEquals(ab1ab[3], 1);
  assertStrictEquals(ab1bb[3], 1);

  // 返却値への操作は自身に影響しない
  ab1ab[0] = 2;
  assertStrictEquals(ab1ab[0], 2);
  assertStrictEquals(ab1bb[0], 255);
  assertStrictEquals(bs1.toBytes()[0], 255);
});

Deno.test("ByteSequence.prototype.toArrayBuffer() - byteLength", () => {
  const bs1 = ByteSequence.create(64);
  bs1.loadUint8Iterable(Uint8Array.of(255, 0, 127, 1));

  const ab1a = bs1.toArrayBuffer({ byteLength: 3 });

  assertStrictEquals(ab1a.byteLength, 3);

  const ab1ab = new Uint8Array(ab1a);

  assertStrictEquals(ab1ab[0], 255);
  assertStrictEquals(ab1ab[1], 0);
  assertStrictEquals(ab1ab[2], 127);
});
