import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../../../src/mod.mts";

const { Base64 } = ByteSequence.Encoding;

Deno.test("ByteSequence.Encoding.Base64.decode()", () => {
  const b = Base64.decode("AwIBAP/+/fw=");
  assertStrictEquals(b.toHex(), "03020100fffefdfc");

  const b2 = Base64.decode("AwIBAP/+/fw");
  assertStrictEquals(b2.toHex(), "03020100fffefdfc");

  const b3 = Base64.decode("AwIBAP_-_fw=", { alphabet: "base64url" });
  assertStrictEquals(b3.toHex(), "03020100fffefdfc");
});
