import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";
import * as dat from "./data/data.mts";

Deno.test("Color.SRgbColor.prototype.toHsl()", () => {
  for (const c of dat.r3Cases) {
    const hsl = Color.SRgbColor.fromRgb24({ r: c.r, g: c.g, b: c.b }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(4), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  for (const c of dat.r1Cases) {
    const hsl = Color.SRgbColor.fromRgb24({ r: c.r, g: 0, b: 0 }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  for (const c of dat.r2Cases) {
    const hsl = Color.SRgbColor.fromRgb24({ r: 255, g: c.x, b: c.x }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }
});
