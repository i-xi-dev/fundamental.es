import { assertStrictEquals } from "@std/assert";
import { BytesEncoding } from "../../../src/mod.mts";

const { Base64 } = BytesEncoding;

Deno.test("BytesEncoding.Base64.encode()", () => {
  const b = Base64.encode(
    Uint8Array.of(0x3, 0x2, 0x1, 0, 0xFF, 0xFE, 0xFD, 0xFC),
  );
  assertStrictEquals(b, "AwIBAP/+/fw=");

  const b2 = Base64.encode(
    Uint8Array.of(0x3, 0x2, 0x1, 0, 0xFF, 0xFE, 0xFD, 0xFC),
    { omitPadding: true },
  );
  assertStrictEquals(b2, "AwIBAP/+/fw");

  const b3 = Base64.encode(
    Uint8Array.of(0x3, 0x2, 0x1, 0, 0xFF, 0xFE, 0xFD, 0xFC),
    { alphabet: "base64url" },
  );
  assertStrictEquals(b3, "AwIBAP_-_fw=");
});
