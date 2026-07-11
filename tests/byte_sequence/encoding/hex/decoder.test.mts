import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../../../src/mod.mts";

const { Hex } = ByteSequence.Encoding;

Deno.test("ByteSequence.Encoding.Hex.Decoder", () => {
  const b = new Hex.Decoder().decode("03020100fffefdfc");
  assertStrictEquals(b.toHex(), "03020100fffefdfc");
});
