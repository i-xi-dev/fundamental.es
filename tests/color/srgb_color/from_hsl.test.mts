import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../src/mod.mts";
import * as dat from "./data/data.mts";

Deno.test("Color.SRgbColor.fromHsl()", () => {
  for (const c of dat.r1Cases) {
    const c0 = Color.SRgbColor.fromHsl({
      h: Number.parseFloat(c.h),
      s: Number.parseFloat(c.s),
      l: Number.parseFloat(c.l),
    });
    assertStrictEquals(c0.red.toFixed(3), (c.r / 255).toFixed(3));
    assertStrictEquals(c0.green, 0);
    assertStrictEquals(c0.blue, 0);
  }

  for (const c of dat.r2Cases) {
    const c0 = Color.SRgbColor.fromHsl({
      h: Number.parseFloat(c.h),
      s: Number.parseFloat(c.s),
      l: Number.parseFloat(c.l),
    });
    assertStrictEquals(c0.red, 1);
    assertStrictEquals(c0.green.toFixed(3), (c.x / 255).toFixed(3));
    assertStrictEquals(c0.blue.toFixed(3), (c.x / 255).toFixed(3));
  }

  for (const c of dat.r3Cases) {
    const c1 = Color.SRgbColor.fromHsl({
      h: Number.parseFloat(c.h),
      s: Number.parseFloat(c.s),
      l: Number.parseFloat(c.l),
    });
    assertStrictEquals(c1.red.toFixed(3), (c.r / 255).toFixed(3));
    assertStrictEquals(c1.green.toFixed(3), (c.g / 255).toFixed(3));
    assertStrictEquals(c1.blue.toFixed(3), (c.b / 255).toFixed(3));
  }

  assertThrows(
    () => {
      const e = null as unknown as { h: number; s: number; l: number };
      Color.SRgbColor.fromHsl(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `h`, `s`, and `l`",
  );
  assertThrows(
    () => {
      const e = { h: 0, s: 0 } as unknown as {
        h: number;
        s: number;
        l: number;
      };
      Color.SRgbColor.fromHsl(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `h`, `s`, and `l`",
  );
  assertThrows(
    () => {
      const e = { s: 0, l: 0 } as unknown as {
        h: number;
        s: number;
        l: number;
      };
      Color.SRgbColor.fromHsl(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `h`, `s`, and `l`",
  );
  assertThrows(
    () => {
      const e = { l: 0, h: 0 } as unknown as {
        h: number;
        s: number;
        l: number;
      };
      Color.SRgbColor.fromHsl(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `h`, `s`, and `l`",
  );
});
