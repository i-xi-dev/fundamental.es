import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.detached", () => {
  const b = ByteSequence.create(0);
  let _ = b.toArrayBuffer();
  assertStrictEquals(b.detached, false);

  _ = b.toArrayBufferWithDetach();
  assertStrictEquals(b.detached, true);
});
