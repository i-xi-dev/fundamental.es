import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.toInverted()", () => {
  const c1 = Color.SRgbColor.fromHexEncoded("#010203");
  const c1i = c1.toInverted().toHexEncoded();
  assertStrictEquals(c1i, "fefdfc");

  const c2 = Color.SRgbColor.fromHexEncoded("#FEFDFC");
  const c2i = c2.toInverted().toHexEncoded();
  assertStrictEquals(c2i, "010203");

  const c3 = Color.SRgbColor.fromHexEncoded("#000000");
  const c3i = c3.toInverted().toHexEncoded();
  assertStrictEquals(c3i, "ffffff");

  const c4 = Color.SRgbColor.fromHexEncoded("#FFFFFF");
  const c4i = c4.toInverted().toHexEncoded();
  assertStrictEquals(c4i, "000000");

  const c5 = Color.SRgbColor.fromHexEncoded("#FF0000");
  const c5i = c5.toInverted().toHexEncoded();
  assertStrictEquals(c5i, "00ffff");

  const c6 = Color.SRgbColor.fromHexEncoded("#202060");
  const c6i = c6.toInverted().toHexEncoded();
  assertStrictEquals(c6i, "dfdf9f");
});
