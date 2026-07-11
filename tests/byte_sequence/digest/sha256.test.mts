import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../../src/mod.mts";

Deno.test("ByteSequence.Digest.Sha256.compute()", async () => {
  const b = await ByteSequence.Digest.Sha256.compute(Uint8Array.of());
  assertStrictEquals(
    b.toHex(),
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  );
});
