import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../../src/mod.mts";

Deno.test("ByteSequence.Digest.Sha384.compute()", async () => {
  const b = await ByteSequence.Digest.Sha384.compute(Uint8Array.of());
  assertStrictEquals(
    b.toHex(),
    "38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b",
  );
});
