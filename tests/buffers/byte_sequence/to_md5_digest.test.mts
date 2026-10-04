import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.toMd5Digest()", async () => {
  const a1 = Uint8Array.of();
  const c1 = await Buffers.ByteSequence.fromBytes(a1).toMd5Digest();
  assertStrictEquals(c1.toHexEncoded(), "d41d8cd98f00b204e9800998ecf8427e");

  const a2 = Uint8Array.of(0);
  const c2 = await Buffers.ByteSequence.fromBytes(a2).toMd5Digest();
  assertStrictEquals(c2.toHexEncoded(), "93b885adfe0da089cdf634904fd59f71");
});
