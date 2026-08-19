import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../../src/mod.mts";
import * as dat from "../data/data.mts";

Deno.test("Color.SRgbColor.Hsl.fromRgbComponents()", () => {
  for (const c of dat.r3Cases) {
    const hsl = Color.SRgbColor.Hsl.fromRgbComponents({
      r: c.r / 0xFF,
      g: c.g / 0xFF,
      b: c.b / 0xFF,
    });
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(4), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  for (const c of dat.r1Cases) {
    const hsl = Color.SRgbColor.Hsl.fromRgbComponents({
      r: c.r / 0xFF,
      g: 0,
      b: 0,
    });
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  for (const c of dat.r2Cases) {
    const hsl = Color.SRgbColor.Hsl.fromRgbComponents({
      r: 1,
      g: c.x / 0xFF,
      b: c.x / 0xFF,
    });
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  assertThrows(
    () => {
      const e = null as unknown as { r: number; g: number; b: number };
      Color.SRgbColor.Hsl.fromRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `r`, `g`, and `b`",
  );
});
