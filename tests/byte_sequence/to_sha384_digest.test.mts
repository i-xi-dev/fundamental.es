import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.toSha384Digest()", async () => {
  const a1 = Uint8Array.of();
  const c1 = await ByteSequence.fromBytes(a1).toSha384Digest();
  assertStrictEquals(
    c1.toHexEncoded(),
    "38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b",
  );
});
