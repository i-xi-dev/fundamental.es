import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../../src/mod.mts";

Deno.test("Color.SRgbColor.Rgb24.toRgbComponents()", () => {
  const c1 = Color.SRgbColor.Rgb24.toRgbComponents({ r: 2, g: 3, b: 4 });
  assertStrictEquals(c1.r, 2 / 255);
  assertStrictEquals(c1.g, 3 / 255);
  assertStrictEquals(c1.b, 4 / 255);

  const c2 = Color.SRgbColor.Rgb24.toRgbComponents({ r: -1, g: 256, b: 100 });
  assertStrictEquals(c2.r, 0 / 255);
  assertStrictEquals(c2.g, 255 / 255);
  assertStrictEquals(c2.b, 100 / 255);

  const c3 = Color.SRgbColor.Rgb24.toRgbComponents({ r: 100, g: -1, b: 256 });
  assertStrictEquals(c3.r, 100 / 255);
  assertStrictEquals(c3.g, 0 / 255);
  assertStrictEquals(c3.b, 255 / 255);

  const c4 = Color.SRgbColor.Rgb24.toRgbComponents({ r: 256, g: 100, b: -1 });
  assertStrictEquals(c4.r, 255 / 255);
  assertStrictEquals(c4.g, 100 / 255);
  assertStrictEquals(c4.b, 0 / 255);

  assertThrows(
    () => {
      const e = null as unknown as { r: number; g: number; b: number };
      Color.SRgbColor.Rgb24.toRgbComponents(e);
    },
    TypeError,
    "Input must be an object with properties `r`, `g`, and `b`, which are 8-bit unsigned integers of type `number`",
  );
});
