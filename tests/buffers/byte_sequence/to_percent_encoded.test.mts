import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.toPercentEncoded()", () => {
  const a1 = Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC);
  const c1 = Buffers.ByteSequence.fromBytes(a1).toPercentEncoded();
  assertStrictEquals(c1, "%03%02%01%00%FF%FE%FD%FC");

  const a2 = Uint8Array.of(
    0x03,
    0x02,
    0x01,
    0x00,
    0x20,
    0xFF,
    0xFE,
    0xFD,
    0xFC,
  );
  const c2 = Buffers.ByteSequence.fromBytes(a2).toPercentEncoded({
    spaceAsPlus: true,
  });
  assertStrictEquals(c2, "%03%02%01%00+%FF%FE%FD%FC");
});
