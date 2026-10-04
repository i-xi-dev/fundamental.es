import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype[Symbol.toStringTag]", () => {
  const b = Buffers.ByteSequence.create(0);
  assertStrictEquals(b[Symbol.toStringTag], "ByteSequence");
});
