import { assertStrictEquals } from "@std/assert";
import { BytesEncoding } from "../../../src/mod.mts";

const { Hex } = BytesEncoding;

Deno.test("BytesEncoding.Hex.decode()", () => {
  const b = Hex.decode("03020100fffefdfc");
  assertStrictEquals(b.toHex(), "03020100fffefdfc");
});
