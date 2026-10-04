import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.toSha1Digest()", async () => {
  const a1 = Uint8Array.of();
  const c1 = await Buffers.ByteSequence.fromBytes(a1).toSha1Digest();
  assertStrictEquals(
    c1.toHexEncoded(),
    "da39a3ee5e6b4b0d3255bfef95601890afd80709",
  );
});
