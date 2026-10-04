import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.Digest.Sha256.compute()", async () => {
  const b = await Buffers.Digest.Sha256.compute(Uint8Array.of());
  assertStrictEquals(
    b.toHex(),
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  );
});
