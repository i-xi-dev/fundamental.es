import { assertStrictEquals } from "@std/assert";
import { BytesDigest } from "../../src/mod.mts";

Deno.test("BytesDigest.Sha256.compute()", async () => {
  const b = await BytesDigest.Sha256.compute(Uint8Array.of());
  assertStrictEquals(
    b.toHex(),
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  );
});
