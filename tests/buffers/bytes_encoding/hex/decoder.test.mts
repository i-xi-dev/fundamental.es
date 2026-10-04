import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../../src/mod.mts";

const { Hex } = Buffers.Encoding;

Deno.test("Buffers.Encoding.Hex.Decoder", () => {
  const b = new Hex.Decoder().decode("03020100fffefdfc");
  assertStrictEquals(b.toHex(), "03020100fffefdfc");
});
