import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../../../src/mod.mts";

const { Base64 } = ByteSequence.Encoding;

Deno.test("ByteSequence.Encoding.Base64.Decoder", () => {
  const b = new Base64.Decoder().decode("AwIBAP/+/fw=");
  assertStrictEquals(b.toHex(), "03020100fffefdfc");

  const b2 = new Base64.Decoder().decode("AwIBAP/+/fw");
  assertStrictEquals(b2.toHex(), "03020100fffefdfc");

  const b3 = new Base64.Decoder({ alphabet: "base64url" }).decode(
    "AwIBAP_-_fw=",
  );
  assertStrictEquals(b3.toHex(), "03020100fffefdfc");
});
