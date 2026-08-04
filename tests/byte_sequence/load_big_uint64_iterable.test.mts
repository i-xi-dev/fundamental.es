import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.loadBigUint64Iterable()", () => {
  const b = ByteSequence.create(16);
  b.loadBigUint64Iterable([0xFFF0123466554433n, 1n]);
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
  b2.loadBigUint64Iterable([0xFFF0123466554433n, 1n], {
    byteOrder: "big-endian",
  });
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
  b3.loadBigUint64Iterable([0xFFF0123466554433n, 1n], {
    byteOrder: "little-endian",
  });
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

Deno.test("ByteSequence.prototype.loadBigUint64Iterable() - error", () => {
  const b3 = ByteSequence.create(16);
  assertThrows(
    () => {
      b3.loadBigUint64Iterable(255 as unknown as bigint[]);
    },
    TypeError,
    "Input must be an `Iterable`",
  );

  const b4 = ByteSequence.create(16);
  assertThrows(
    () => {
      b4.loadBigUint64Iterable([255n, "x" as unknown as bigint]);
    },
    TypeError,
    "Input must be a `bigint`", //XXX 主語を変えたい
  );
});

Deno.test("ByteSequence.prototype.loadBigUint64Iterable() - insertAt", () => {
  const b = ByteSequence.create(64);
  b.loadBigUint64Iterable([0xFFF0123466554433n, 1n]);
  b.loadBigUint64Iterable([0xFFF0123466554433n, 1n], { insertAt: 1 });
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
