import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.toBase64Encoded()", () => {
  const a1 = Uint8Array.of(0x3, 0x2, 0x1, 0, 0xFF, 0xFE, 0xFD, 0xFC);

  const c1 = ByteSequence.fromBytes(a1).toBase64Encoded();
  assertStrictEquals(c1, "AwIBAP/+/fw=");

  const c2 = ByteSequence.fromBytes(a1).toBase64Encoded({
    alphabet: "base64url",
    omitPadding: true,
  });
  assertStrictEquals(c2, "AwIBAP_-_fw");
});
