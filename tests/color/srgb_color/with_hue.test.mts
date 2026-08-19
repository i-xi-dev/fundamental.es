import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.withHue()", () => {
  const c1 = Color.SRgbColor.fromRgb24({ r: 0xFF, g: 0xFE, b: 0xFD });
  const c1a = c1.withHue(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, 0);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.withHue(-1);
  assertStrictEquals(c1b.lightness, c1.lightness);
  assertStrictEquals(c1b.hue.toFixed(6), (359).toFixed(6));
  assertStrictEquals(c1b.saturation, c1.saturation);

  const c2 = Color.SRgbColor.fromRgb24({ r: 0x11, g: 0x21, b: 0x31 });
  const c2a = c2.withHue(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue.toFixed(6), (1).toFixed(6));
  assertStrictEquals(c2a.saturation, c2.saturation);

  const c2b = c2.withHue(20000);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue.toFixed(6), (200).toFixed(6));
  assertStrictEquals(c2b.saturation, c2.saturation);
});
