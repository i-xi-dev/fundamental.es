import { assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../../src/mod.mts";

const { Hex } = Buffers.Encoding;

Deno.test("Buffers.Encoding.Hex.decode()", () => {
  const b = Hex.decode("03020100fffefdfc");
  assertStrictEquals(b.toHex(), "03020100fffefdfc");
});
