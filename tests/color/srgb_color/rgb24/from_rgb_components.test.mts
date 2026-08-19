import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../../src/mod.mts";

Deno.test("Color.SRgbColor.Rgb24.fromRgbComponents()", () => {
  const c1 = Color.SRgbColor.Rgb24.fromRgbComponents({ r: 0, g: 0.5, b: 0.25 });
  assertStrictEquals(c1.r, 0);
  assertStrictEquals(c1.g, 128);
  assertStrictEquals(c1.b, 64);

  assertThrows(
    () => {
      const e = null as unknown as { r: number; g: number; b: number };
      Color.SRgbColor.Rgb24.fromRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `r`, `g`, and `b`",
  );
});
