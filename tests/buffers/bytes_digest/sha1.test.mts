import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.Digest.Sha1.compute()", async () => {
  const b = await Buffers.Digest.Sha1.compute(Uint8Array.of());
  assertStrictEquals(b.toHex(), "da39a3ee5e6b4b0d3255bfef95601890afd80709");
});
