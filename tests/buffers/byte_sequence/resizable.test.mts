import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.resizable", () => {
  const b = Buffers.ByteSequence.create(0);
  assertStrictEquals(b.resizable, false);

  const b2 = Buffers.ByteSequence.create(10);
  assertStrictEquals(b2.resizable, false);

  const b3 = Buffers.ByteSequence.create(0, 2);
  assertStrictEquals(b3.resizable, true);

  const b4 = Buffers.ByteSequence.create(10, 10);
  assertStrictEquals(b4.resizable, true);
});
