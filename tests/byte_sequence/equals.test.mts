import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.equals() - ByteSequence", () => {
  const bs0 = ByteSequence.create(0);
  const bs0b = ByteSequence.create(0);

  const bs1 = ByteSequence.create(100);
  bs1.loadUint8Iterable(Uint8Array.of(255, 0, 127, 1));
  const bs1b = ByteSequence.create(100);
  bs1b.loadUint8Iterable([255, 0, 127, 1]);

  assertStrictEquals(bs0.equals(bs0), true);
  assertStrictEquals(bs0.equals(bs0b), true);

  assertStrictEquals(bs1.equals(bs1), true);
  assertStrictEquals(bs1.equals(bs1b), true);
  assertStrictEquals(bs1.equals(bs0), false);
  assertStrictEquals(bs0.equals(bs1), false);
});

Deno.test("ByteSequence.prototype.equals() - ArrayBufferView", () => {
  const bs0 = ByteSequence.create(0);

  const bs1 = ByteSequence.create(100);
  bs1.loadUint8Iterable(Uint8Array.of(255, 0, 127, 1));

  assertStrictEquals(bs0.equals(new Uint8Array(0)), true);
  assertStrictEquals(bs1.equals(bs1.toBytes()), true);
  assertStrictEquals(bs1.equals(Uint8Array.of(255, 0, 127, 1)), true);
  assertStrictEquals(
    bs1.equals(new Uint16Array(Uint8Array.of(255, 0, 127, 1).buffer)),
    true,
  );

  assertStrictEquals(bs1.equals(Uint8Array.of(255, 0, 123, 1)), false);
  assertStrictEquals(bs1.equals(Uint8Array.of(255, 0, 127, 1, 5)), false);
  assertStrictEquals(bs1.equals(Uint8Array.of(255, 0, 127)), false);
});

Deno.test("ByteSequence.prototype.equals() - Array<number>", () => {
  const bs0 = ByteSequence.create(0);

  const bs1 = ByteSequence.create(100);
  bs1.loadUint8Iterable(Uint8Array.of(255, 0, 127, 1));

  assertStrictEquals(bs0.equals([]), true);
  assertStrictEquals(bs1.equals(bs1.toArray()), true);
  assertStrictEquals(bs1.equals([255, 0, 127, 1]), true);

  assertStrictEquals(bs1.equals([255, 0, 127, 2]), false);
  assertStrictEquals(bs1.equals([255, 0, 127, 1, 2]), false);
  assertStrictEquals(bs1.equals([255, 0, 127]), false);
});

Deno.test("ByteSequence.prototype.equals() - ArrayBuffer", () => {
  const bs0 = ByteSequence.create(0);

  const bs1 = ByteSequence.create(100);
  bs1.loadUint8Iterable(Uint8Array.of(255, 0, 127, 1));
  const bs1b = ByteSequence.create(100);
  bs1b.loadUint8Iterable([255, 0, 127, 1]);

  assertStrictEquals(bs0.equals(bs0.toArrayBuffer()), true);
  assertStrictEquals(bs1.equals(bs1b.toArrayBuffer()), true);
});
