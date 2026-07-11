import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../../../src/mod.mts";

const { Hex } = ByteSequence.Encoding;

Deno.test("ByteSequence.Encoding.Hex.decode()", () => {
  const b = Hex.decode("03020100fffefdfc");
  assertStrictEquals(b.toHex(), "03020100fffefdfc");
});
