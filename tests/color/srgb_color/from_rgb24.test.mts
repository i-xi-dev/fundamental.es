import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.fromRgb24()", () => {
  const c1 = Color.SRgbColor.fromRgb24({ r: 2, g: 3, b: 4 });
  assertStrictEquals(c1.red, 2 / 255);
  assertStrictEquals(c1.green, 3 / 255);
  assertStrictEquals(c1.blue, 4 / 255);

  const c2 = Color.SRgbColor.fromRgb24({ r: -1, g: 256, b: 100 });
  assertStrictEquals(c2.red, 0 / 255);
  assertStrictEquals(c2.green, 255 / 255);
  assertStrictEquals(c2.blue, 100 / 255);

  const c3 = Color.SRgbColor.fromRgb24({ r: 100, g: -1, b: 256 });
  assertStrictEquals(c3.red, 100 / 255);
  assertStrictEquals(c3.green, 0 / 255);
  assertStrictEquals(c3.blue, 255 / 255);

  const c4 = Color.SRgbColor.fromRgb24({ r: 256, g: 100, b: -1 });
  assertStrictEquals(c4.red, 255 / 255);
  assertStrictEquals(c4.green, 100 / 255);
  assertStrictEquals(c4.blue, 0 / 255);

  assertThrows(
    () => {
      const e = null as unknown as { r: number; g: number; b: number };
      Color.SRgbColor.fromRgb24(e);
    },
    TypeError,
    "Input must be an object with properties `r`, `g`, and `b`, which are 8-bit unsigned integers of type `number`",
  );
  assertThrows(
    () => {
      const e = { r: 0, g: 0 } as unknown as {
        r: number;
        g: number;
        b: number;
      };
      Color.SRgbColor.fromRgb24(e);
    },
    TypeError,
    "Input must be an object with properties `r`, `g`, and `b`, which are 8-bit unsigned integers of type `number`",
  );
  assertThrows(
    () => {
      const e = { g: 0, b: 0 } as unknown as {
        r: number;
        g: number;
        b: number;
      };
      Color.SRgbColor.fromRgb24(e);
    },
    TypeError,
    "Input must be an object with properties `r`, `g`, and `b`, which are 8-bit unsigned integers of type `number`",
  );
  assertThrows(
    () => {
      const e = { b: 0, r: 0 } as unknown as {
        r: number;
        g: number;
        b: number;
      };
      Color.SRgbColor.fromRgb24(e);
    },
    TypeError,
    "Input must be an object with properties `r`, `g`, and `b`, which are 8-bit unsigned integers of type `number`",
  );
  assertThrows(
    () => {
      const e = { r: 0, g: 0, b: 1.5 };
      Color.SRgbColor.fromRgb24(e);
    },
    TypeError,
    "Input must be an object with properties `r`, `g`, and `b`, which are 8-bit unsigned integers of type `number`",
  );
});
