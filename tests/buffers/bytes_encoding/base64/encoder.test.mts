import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../../src/mod.mts";

const { Base64 } = Buffers.Encoding;

Deno.test("Buffers.Encoding.Base64.Encoder", () => {
  const b = new Base64.Encoder().encode(
    Uint8Array.of(0x3, 0x2, 0x1, 0, 0xFF, 0xFE, 0xFD, 0xFC),
  );
  assertStrictEquals(b, "AwIBAP/+/fw=");

  const b2 = new Base64.Encoder({ omitPadding: true }).encode(
    Uint8Array.of(0x3, 0x2, 0x1, 0, 0xFF, 0xFE, 0xFD, 0xFC),
  );
  assertStrictEquals(b2, "AwIBAP/+/fw");

  const b3 = new Base64.Encoder({ alphabet: "base64url" }).encode(
    Uint8Array.of(0x3, 0x2, 0x1, 0, 0xFF, 0xFE, 0xFD, 0xFC),
  );
  assertStrictEquals(b3, "AwIBAP_-_fw=");
});
