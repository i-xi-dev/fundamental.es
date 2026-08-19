import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../../src/mod.mts";
import * as dat from "../data/data.mts";

Deno.test("Color.SRgbColor.Hsl.toRgbComponents()", () => {
  for (const c of dat.r1Cases) {
    const c0 = Color.SRgbColor.Hsl.toRgbComponents({
      h: Number.parseFloat(c.h),
      s: Number.parseFloat(c.s),
      l: Number.parseFloat(c.l),
    });
    assertStrictEquals(c0.r.toFixed(3), (c.r / 255).toFixed(3));
    assertStrictEquals(c0.g, 0);
    assertStrictEquals(c0.b, 0);
  }

  for (const c of dat.r2Cases) {
    const c0 = Color.SRgbColor.Hsl.toRgbComponents({
      h: Number.parseFloat(c.h),
      s: Number.parseFloat(c.s),
      l: Number.parseFloat(c.l),
    });
    assertStrictEquals(c0.r, 1);
    assertStrictEquals(c0.g.toFixed(3), (c.x / 255).toFixed(3));
    assertStrictEquals(c0.b.toFixed(3), (c.x / 255).toFixed(3));
  }

  for (const c of dat.r3Cases) {
    const c1 = Color.SRgbColor.Hsl.toRgbComponents({
      h: Number.parseFloat(c.h),
      s: Number.parseFloat(c.s),
      l: Number.parseFloat(c.l),
    });
    assertStrictEquals(c1.r.toFixed(3), (c.r / 255).toFixed(3));
    assertStrictEquals(c1.g.toFixed(3), (c.g / 255).toFixed(3));
    assertStrictEquals(c1.b.toFixed(3), (c.b / 255).toFixed(3));
  }

  assertThrows(
    () => {
      const e = null as unknown as { h: number; s: number; l: number };
      Color.SRgbColor.Hsl.toRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `h`, `s`, and `l`",
  );
});
