import { assertStrictEquals } from "@std/assert";
import { BytesDigest } from "../../src/mod.mts";

Deno.test("BytesDigest.Sha1.compute()", async () => {
  const b = await BytesDigest.Sha1.compute(Uint8Array.of());
  assertStrictEquals(b.toHex(), "da39a3ee5e6b4b0d3255bfef95601890afd80709");
});
