import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../../src/mod.mts";
import * as dat from "../data/data.mts";

Deno.test("Color.SRgbColor.Hwb.toRgbComponents()", () => {
  for (const c of dat.r1Cases) {
    const c0 = Color.SRgbColor.Hwb.toRgbComponents({
      h: Number.parseFloat(c.h),
      w: Number.parseFloat(c.wt),
      b: Number.parseFloat(c.bk),
    });
    assertStrictEquals(
      c0.r.toFixed(3).substring(0, 4),
      (c.r / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(c0.g, 0);
    assertStrictEquals(c0.b, 0);
  }

  for (const c of dat.r2Cases) {
    const c0 = Color.SRgbColor.Hwb.toRgbComponents({
      h: Number.parseFloat(c.h),
      w: Number.parseFloat(c.wt),
      b: Number.parseFloat(c.bk),
    });
    assertStrictEquals(c0.r, 1);
    assertStrictEquals(
      c0.g.toFixed(3).substring(0, 4),
      (c.x / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(
      c0.b.toFixed(3).substring(0, 4),
      (c.x / 255).toFixed(3).substring(0, 4),
    );
  }

  for (const c of dat.r3Cases) {
    const c1 = Color.SRgbColor.Hwb.toRgbComponents({
      h: Number.parseFloat(c.h),
      w: Number.parseFloat(c.wt),
      b: Number.parseFloat(c.bk),
    });
    assertStrictEquals(c1.r.toFixed(3), (c.r / 255).toFixed(3));
    assertStrictEquals(c1.g.toFixed(3), (c.g / 255).toFixed(3));
    assertStrictEquals(c1.b.toFixed(3), (c.b / 255).toFixed(3));
  }

  assertThrows(
    () => {
      const e = null as unknown as { h: number; w: number; b: number };
      Color.SRgbColor.Hwb.toRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `h`, `w`, and `b`",
  );
});
