import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.loadUint16Iterable()", () => {
  const b = ByteSequence.create(4);
  b.loadUint16Iterable([0xFFF0, 0x0033]);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0xF0);
  assertStrictEquals(bytes[1], 0xFF);
  assertStrictEquals(bytes[2], 0x33);
  assertStrictEquals(bytes[3], 0x00);

  const b2 = ByteSequence.create(4);
  b2.loadUint16Iterable([0xFFF0, 0x0033], { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x00);
  assertStrictEquals(bytes2[3], 0x33);

  const b3 = ByteSequence.create(4);
  b3.loadUint16Iterable([0xFFF0, 0x0033], { byteOrder: "little-endian" });
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 4);
  assertStrictEquals(bytes3[0], 0xF0);
  assertStrictEquals(bytes3[1], 0xFF);
  assertStrictEquals(bytes3[2], 0x33);
  assertStrictEquals(bytes3[3], 0x00);
});

Deno.test("ByteSequence.prototype.loadUint16Iterable() - error", () => {
  const b3 = ByteSequence.create(4);
  assertThrows(
    () => {
      b3.loadUint16Iterable(255 as unknown as number[]);
    },
    TypeError,
    "Input must be an `Iterable`",
  );

  const b4 = ByteSequence.create(4);
  assertThrows(
    () => {
      b4.loadUint16Iterable([255, "x" as unknown as number]);
    },
    TypeError,
    "Input must be a safe-integer of type `number`", //XXX 主語を変えたい
  );
});

Deno.test("ByteSequence.prototype.loadUint16Iterable() - insertAt", () => {
  const b = ByteSequence.create(64);
  b.loadUint16Iterable([0xFFF0, 0x0033]);
  b.loadUint16Iterable([0xFFF0, 0x0033], { insertAt: 1 });
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 5);
  assertStrictEquals(bytes[0], 0xF0);
  assertStrictEquals(bytes[1], 0xF0);
  assertStrictEquals(bytes[2], 0xFF);
  assertStrictEquals(bytes[3], 0x33);
  assertStrictEquals(bytes[4], 0x00);
});
