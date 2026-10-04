import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.toSha256Digest()", async () => {
  const a1 = Uint8Array.of();
  const c1 = await Buffers.ByteSequence.fromBytes(a1).toSha256Digest();
  assertStrictEquals(
    c1.toHexEncoded(),
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  );
});
