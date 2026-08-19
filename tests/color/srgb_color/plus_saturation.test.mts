import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.plusSaturation()", () => {
  const c1 = Color.SRgbColor.fromRgb24({ r: 0xFF, g: 0xFE, b: 0xFD });
  const c1a = c1.plusSaturation(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, c1.hue);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.plusSaturation(-1);
  assertStrictEquals(c1b.lightness, c1.lightness);
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = Color.SRgbColor.fromRgb24({ r: 0x11, g: 0x21, b: 0x31 });
  const c2a = c2.plusSaturation(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue, c2.hue);
  assertStrictEquals(c2a.saturation, 1);

  const c2b = c2.plusSaturation(2);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue, c2.hue);
  assertStrictEquals(c2b.saturation, 1);

  const c3 = Color.SRgbColor.fromRgb24({ r: 0x3, g: 0x2, b: 0x3 });
  const c3a = c3.plusSaturation(0.5);
  assertStrictEquals(c3a.lightness, c3.lightness);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(
    c3a.saturation.toFixed(6),
    (c3.saturation + 0.5).toFixed(6),
  );

  const c4 = Color.SRgbColor.fromRgb24({ r: 0, g: 0, b: 0x80 });
  const c4a = c4.plusSaturation(-0.5);
  assertStrictEquals(c4a.toBytes().toHex(), "202060");
});
