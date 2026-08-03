import { assertStrictEquals } from "@std/assert";
import { BytesEncoding } from "../../../src/mod.mts";

const { Hex } = BytesEncoding;

Deno.test("BytesEncoding.Hex.Decoder", () => {
  const b = new Hex.Decoder().decode("03020100fffefdfc");
  assertStrictEquals(b.toHex(), "03020100fffefdfc");
});
