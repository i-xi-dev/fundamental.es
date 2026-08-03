import { assertStrictEquals } from "@std/assert";
import { BytesEncoding } from "../../../src/mod.mts";

const { Hex } = BytesEncoding;

Deno.test("BytesEncoding.Hex.encode()", () => {
  const b = Hex.encode(Uint8Array.of(0x3, 0x2, 0x1, 0, 0xFF, 0xFE, 0xFD, 0xFC));
  assertStrictEquals(b, "03020100fffefdfc");
});
