import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../../src/mod.mts";

Deno.test("ByteSequence.Digest.Sha512.compute()", async () => {
  const b = await ByteSequence.Digest.Sha512.compute(Uint8Array.of());
  assertStrictEquals(
    b.toHex(),
    "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e",
  );
});
