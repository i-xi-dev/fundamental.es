import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.withLightness()", () => {
  const c1 = Color.SRgbColor.fromHexEncoded("#fffefd");
  const c1a = c1.withLightness(0);
  assertStrictEquals(c1a.lightness, 0);
  assertStrictEquals(c1a.hue, 0);
  assertStrictEquals(c1a.saturation, 0);

  const c1b = c1.withLightness(-1);
  assertStrictEquals(c1b.lightness, 0);
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = Color.SRgbColor.fromHexEncoded("#112131");
  const c2a = c2.withLightness(1);
  assertStrictEquals(c2a.lightness, 1);
  assertStrictEquals(c2a.hue, 0);
  assertStrictEquals(c2a.saturation, 0);

  const c2b = c2.withLightness(2);
  assertStrictEquals(c2b.lightness, 1);
  assertStrictEquals(c2b.hue, 0);
  assertStrictEquals(c2b.saturation, 0);

  const c3 = Color.SRgbColor.fromHexEncoded("#fffefd");
  const c3a = c3.withLightness(0.5);
  assertStrictEquals(c3a.lightness, 0.5);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(c3a.saturation, c3.saturation);

  const c4 = Color.SRgbColor.fromHexEncoded("#0000ff");
  const c4a = c4.withLightness(0.25);
  assertStrictEquals(c4a.toHexEncoded(), "000080");
});
