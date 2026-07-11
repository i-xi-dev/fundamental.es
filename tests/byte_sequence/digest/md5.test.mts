import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../../src/mod.mts";

Deno.test("ByteSequence.Digest.Md5.compute()", async () => {
  const b = await ByteSequence.Digest.Md5.compute(Uint8Array.of());
  assertStrictEquals(b.toHex(), "d41d8cd98f00b204e9800998ecf8427e");
});
