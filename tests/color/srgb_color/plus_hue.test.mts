import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.plusHue()", () => {
  const c1 = Color.SRgbColor.fromRgb24({ r: 0xFF, g: 0xFE, b: 0xFD });
  const c1a = c1.plusHue(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, c1.hue);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c2 = Color.SRgbColor.fromHsl({ h: 12, s: 0.5, l: 0.5 });
  const c2a = c2.plusHue(-1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue.toFixed(6), (11).toFixed(6));
  assertStrictEquals(c2a.saturation, c2.saturation);

  const c2b = c2.plusHue(1);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue.toFixed(6), (13).toFixed(6));
  assertStrictEquals(c2b.saturation, c2.saturation);

  const c2c = c2.plusHue(20000);
  assertStrictEquals(c2c.lightness, c2.lightness);
  assertStrictEquals(c2c.hue.toFixed(6), (212).toFixed(6));
  assertStrictEquals(c2c.saturation, c2.saturation);

  const c3 = Color.SRgbColor.fromRgb24({ r: 0xFF, g: 0, b: 0 });
  const c3a = c3.plusHue(120);
  assertStrictEquals(c3a.toBytes().toHex(), "00ff00");
  const c3a2 = c3.plusHue(-120);
  assertStrictEquals(c3a2.toBytes().toHex(), "0000ff");
  const c3a3 = c3a2.plusHue(660);
  assertStrictEquals(c3a3.toBytes().toHex(), "00ffff");
  const c3b = c3a.plusHue(60);
  assertStrictEquals(c3b.toBytes().toHex(), "00ffff");
});
