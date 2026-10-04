import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.capacity", () => {
  const b = Buffers.ByteSequence.create(0);
  assertStrictEquals(b.capacity, 0);

  const b2 = Buffers.ByteSequence.create(10);
  assertStrictEquals(b2.capacity, 10);
});
