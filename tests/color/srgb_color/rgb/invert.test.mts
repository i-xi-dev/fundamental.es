import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../../src/mod.mts";

Deno.test("Color.SRgbColor.Rgb.invert()", () => {
  const c1 = Color.SRgbColor.Rgb.invert({
    r: 0x1 / 255,
    g: 0x2 / 255,
    b: 0x3 / 255,
  });
  assertStrictEquals(c1.r, 0xFE / 255);
  assertStrictEquals(c1.g, 0xFD / 255);
  assertStrictEquals(c1.b, 0xFC / 255);

  assertThrows(
    () => {
      const e = null as unknown as { r: number; g: number; b: number };
      Color.SRgbColor.Rgb.invert(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `r`, `g`, and `b`",
  );
});
