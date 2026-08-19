import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.toRgb24()", () => {
  const c1 = Color.SRgbColor.fromRgbComponents({ r: 0, g: 0.5, b: 0.25 });
  const c1r = c1.toRgb24();
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  c1r.r = 255;
  assertStrictEquals(c1.red, 0);

  for (let i = 0; i <= 0xFF; i++) {
    const c2 = Color.SRgbColor.fromRgb24({ r: i, g: 128, b: 64 });
    const c2r = c2.toRgb24();
    assertStrictEquals(c2r.r, i);
  }
});
