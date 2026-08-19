import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.withSaturation()", () => {
  const c1 = Color.SRgbColor.fromBytes(Uint8Array.fromHex("fffefd"));
  const c1a = c1.withSaturation(0);
  //assertStrictEquals(c1a.lightness, 0); 連動して変わる
  assertStrictEquals(c1a.hue, 0);
  assertStrictEquals(c1a.saturation, 0);

  const c1b = c1.withSaturation(-1);
  //assertStrictEquals(c1b.lightness, 0); 連動して変わる
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = Color.SRgbColor.fromBytes(Uint8Array.fromHex("112131"));
  const c2a = c2.withSaturation(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue, c2.hue);
  assertStrictEquals(c2a.saturation, 1);

  const c2b = c2.withSaturation(2);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue, c2.hue);
  assertStrictEquals(c2b.saturation, 1);

  const c3 = Color.SRgbColor.fromBytes(Uint8Array.fromHex("fffefd"));
  const c3a = c3.withSaturation(0.5);
  assertStrictEquals(c3a.lightness, c3.lightness);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(c3a.saturation, 0.5);

  const c4 = Color.SRgbColor.fromBytes(Uint8Array.fromHex("000080"));
  const c4a = c4.withSaturation(0.5);
  assertStrictEquals(c4a.toBytes().toHex(), "202060");
});
