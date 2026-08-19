import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../../src/mod.mts";
import * as dat from "../data/data.mts";

Deno.test("Color.SRgbColor.Hwb.fromRgbComponents()", () => {
  for (const c of dat.r3Cases) {
    const hsl = Color.SRgbColor.Hwb.fromRgbComponents({
      r: c.r / 255,
      g: c.g / 255,
      b: c.b / 255,
    });
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  for (const c of dat.r1Cases) {
    const hsl = Color.SRgbColor.Hwb.fromRgbComponents({
      r: c.r / 255,
      g: 0,
      b: 0,
    });
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  for (const c of dat.r2Cases) {
    const hsl = Color.SRgbColor.Hwb.fromRgbComponents({
      r: 255,
      g: c.x / 255,
      b: c.x / 255,
    });
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  assertThrows(
    () => {
      const e = null as unknown as { r: number; g: number; b: number };
      Color.SRgbColor.Hwb.fromRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `r`, `g`, and `b`",
  );
});
