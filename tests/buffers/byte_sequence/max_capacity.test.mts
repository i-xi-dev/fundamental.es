import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.maxCapacity", () => {
  const b = Buffers.ByteSequence.create(0);
  assertStrictEquals(b.maxCapacity, 0);

  const b2 = Buffers.ByteSequence.create(10);
  assertStrictEquals(b2.maxCapacity, 10);

  const b3 = Buffers.ByteSequence.create(0, 2);
  assertStrictEquals(b3.maxCapacity, 2);

  const b4 = Buffers.ByteSequence.create(10, 10);
  assertStrictEquals(b4.maxCapacity, 10);
});
