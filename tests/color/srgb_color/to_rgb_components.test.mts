import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.toRgbComponents()", () => {
  const c1 = Color.SRgbColor.fromRgb24({ r: 255, g: 127, b: 0 })
    .toRgbComponents();
  assertStrictEquals(c1.r, 1);
  assertStrictEquals(c1.g, 127 / 255);
  assertStrictEquals(c1.b, 0);

  const c2 = Color.SRgbColor.fromRgb24({ r: 0, g: 255, b: 127 })
    .toRgbComponents();
  assertStrictEquals(c2.r, 0);
  assertStrictEquals(c2.g, 1);
  assertStrictEquals(c2.b, 127 / 255);

  const c3 = Color.SRgbColor.fromRgb24({ r: 127, g: 0, b: 255 })
    .toRgbComponents();
  assertStrictEquals(c3.r, 127 / 255);
  assertStrictEquals(c3.g, 0);
  assertStrictEquals(c3.b, 1);
});
