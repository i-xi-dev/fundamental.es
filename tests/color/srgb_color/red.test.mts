import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.red", () => {
  const c1 = Color.SRgbColor.fromRgb24({ r: 255, g: 0, b: 0 });
  assertStrictEquals(c1.red, 1);

  const c2 = Color.SRgbColor.fromRgb24({ r: 0, g: 255, b: 255 });
  assertStrictEquals(c2.red, 0);

  const c3 = Color.SRgbColor.fromRgb24({ r: 127, g: 255, b: 255 });
  assertStrictEquals(c3.red, 127 / 255);
});
