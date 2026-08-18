import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.green", () => {
  const c1 = Color.SRgbColor.fromRgb24({ r: 0, g: 255, b: 0 });
  assertStrictEquals(c1.green, 1);

  const c2 = Color.SRgbColor.fromRgb24({ r: 255, g: 0, b: 255 });
  assertStrictEquals(c2.green, 0);

  const c3 = Color.SRgbColor.fromRgb24({ r: 0, g: 127, b: 255 });
  assertStrictEquals(c3.green, 127 / 255);
});
