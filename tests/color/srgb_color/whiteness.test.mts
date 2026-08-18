import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";
import * as dat from "./data/data.mts";

Deno.test("Color.SRgbColor.prototype.whiteness", () => {
  for (const c of dat.r3Cases) {
    const hsl = Color.SRgbColor.fromRgb24({ r: c.r, g: c.g, b: c.b });
    assertStrictEquals(hsl.whiteness.toFixed(4), c.wt);
  }
});
