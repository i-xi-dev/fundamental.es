import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.blue", () => {
  const c1 = Color.SRgbColor.fromRgb24({ r: 0, g: 0, b: 255 });
  assertStrictEquals(c1.blue, 1);

  const c2 = Color.SRgbColor.fromRgb24({ r: 255, g: 255, b: 0 });
  assertStrictEquals(c2.blue, 0);

  const c3 = Color.SRgbColor.fromRgb24({ r: 0, g: 0, b: 127 });
  assertStrictEquals(c3.blue, 127 / 255);
});
