import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.count", () => {
  const b = ByteSequence.create(0);
  assertStrictEquals(b.count, 0);

  const b2 = ByteSequence.create(10);
  assertStrictEquals(b2.count, 0);
  b2.loadByte(255);
  assertStrictEquals(b2.count, 1);
  b2.loadByte(255);
  b2.loadByte(255);
  b2.loadByte(255);
  b2.loadByte(255);
  b2.loadByte(255);
  b2.loadByte(255);
  b2.loadByte(255);
  b2.loadByte(255);
  b2.loadByte(255);
  assertStrictEquals(b2.count, 10);

  const b3 = ByteSequence.create(0, 10);
  assertStrictEquals(b3.count, 0);
  b3.loadByte(255);
  assertStrictEquals(b3.count, 1);
  b3.loadByte(255);
  b3.loadByte(255);
  b3.loadByte(255);
  b3.loadByte(255);
  b3.loadByte(255);
  b3.loadByte(255);
  b3.loadByte(255);
  b3.loadByte(255);
  b3.loadByte(255);
  assertStrictEquals(b3.count, 10);
});
