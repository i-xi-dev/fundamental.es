import { assertStrictEquals } from "@std/assert";
import { BytesEncoding } from "../../../src/mod.mts";

const { Base64 } = BytesEncoding;

Deno.test("BytesEncoding.Base64.Decoder", () => {
  const b = new Base64.Decoder().decode("AwIBAP/+/fw=");
  assertStrictEquals(b.toHex(), "03020100fffefdfc");

  const b2 = new Base64.Decoder().decode("AwIBAP/+/fw");
  assertStrictEquals(b2.toHex(), "03020100fffefdfc");

  const b3 = new Base64.Decoder({ alphabet: "base64url" }).decode(
    "AwIBAP_-_fw=",
  );
  assertStrictEquals(b3.toHex(), "03020100fffefdfc");
});
