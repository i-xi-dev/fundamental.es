import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.toHex()", () => {
  const a1 = Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC);

  const c1 = ByteSequence.fromBytes(a1).toHex();
  assertStrictEquals(c1, "03020100fffefdfc");
});
