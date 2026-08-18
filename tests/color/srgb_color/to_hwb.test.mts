import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";
import * as dat from "./data/data.mts";

Deno.test("Color.SRgbColor.prototype.toHwb()", () => {
  for (const c of dat.r3Cases) {
    const hsl = Color.SRgbColor.fromRgb24({ r: c.r, g: c.g, b: c.b }).toHwb();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  for (const c of dat.r1Cases) {
    const hsl = Color.SRgbColor.fromRgb24({ r: c.r, g: 0, b: 0 }).toHwb();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  for (const c of dat.r2Cases) {
    const hsl = Color.SRgbColor.fromRgb24({ r: 255, g: c.x, b: c.x }).toHwb();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }
});
