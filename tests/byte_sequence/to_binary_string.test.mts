import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.toBinaryString()", () => {
  const a1 = Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC);

  const c1 = ByteSequence.fromBytes(a1).toBinaryString();
  assertStrictEquals(c1, "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC");
});
