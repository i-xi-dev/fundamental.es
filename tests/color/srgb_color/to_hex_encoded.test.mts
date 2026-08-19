import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.toHexEncoded()", () => {
  const c1 = Color.SRgbColor.fromRgbComponents({ r: 0, g: 0.5, b: 0.25 });
  const c1r = c1.toHexEncoded();
  assertStrictEquals(c1r, "008040");

  for (let i = 0; i <= 0xFF; i++) {
    const c2 = Color.SRgbColor.fromRgb24({ r: i, g: 128, b: 64 });
    const c2r = c2.toHexEncoded();
    assertStrictEquals(c2r, `${i.toString(16).padStart(2, "0")}8040`);
  }
});
