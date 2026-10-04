import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.detached", () => {
  const b = Buffers.ByteSequence.create(0);
  let _ = b.toArrayBuffer();
  assertStrictEquals(b.detached, false);

  _ = b.toArrayBufferWithDetach();
  assertStrictEquals(b.detached, true);
});
