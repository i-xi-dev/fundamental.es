import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.toSha512Digest()", async () => {
  const a1 = Uint8Array.of();
  const c1 = await ByteSequence.fromBytes(a1).toSha512Digest();
  assertStrictEquals(
    c1.toHexEncoded(),
    "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e",
  );
});
