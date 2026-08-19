import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.toUint8ClampedArray()", () => {
  const c1 = Color.SRgbColor.fromRgbComponents({ r: 0, g: 0.5, b: 0.25 });
  const [r, g, b] = c1.toUint8ClampedArray();
  assertStrictEquals(r, 0);
  assertStrictEquals(g, 128);
  assertStrictEquals(b, 64);

  for (let i = 0; i <= 0xFF; i++) {
    const c2 = Color.SRgbColor.fromRgb24({ r: i, g: 128, b: 64 });
    const [r] = c2.toUint8ClampedArray();
    assertStrictEquals(r, i);
  }
});
