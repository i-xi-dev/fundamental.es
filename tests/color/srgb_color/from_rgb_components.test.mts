import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.fromRgbComponents()", () => {
  const c1 = Color.SRgbColor.fromRgbComponents({ r: 1, g: 0.9, b: 0.1 });
  assertStrictEquals(c1.red, 1);
  assertStrictEquals(c1.green, 0.9);
  assertStrictEquals(c1.blue, 0.1);

  const c2 = Color.SRgbColor.fromRgbComponents({ r: -0.1, g: 1.1, b: 0.5 });
  assertStrictEquals(c2.red, 0);
  assertStrictEquals(c2.green, 1);
  assertStrictEquals(c2.blue, 0.5);

  const c3 = Color.SRgbColor.fromRgbComponents({ r: 0.5, g: -0.1, b: 1.1 });
  assertStrictEquals(c3.red, 0.5);
  assertStrictEquals(c3.green, 0);
  assertStrictEquals(c3.blue, 1);

  const c4 = Color.SRgbColor.fromRgbComponents({ r: 1.1, g: 0.5, b: -0.1 });
  assertStrictEquals(c4.red, 1);
  assertStrictEquals(c4.green, 0.5);
  assertStrictEquals(c4.blue, 0);

  const c10 = Color.SRgbColor.fromRgbComponents({ r: 0.11, g: 0.12, b: 0.13 });
  assertStrictEquals(c10.red, 0.11);
  assertStrictEquals(c10.green, 0.12);
  assertStrictEquals(c10.blue, 0.13);

  assertThrows(
    () => {
      const e = null as unknown as { r: number; g: number; b: number };
      Color.SRgbColor.fromRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `r`, `g`, and `b`",
  );
  assertThrows(
    () => {
      const e = { r: 0, g: 0 } as unknown as {
        r: number;
        g: number;
        b: number;
      };
      Color.SRgbColor.fromRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `r`, `g`, and `b`",
  );
  assertThrows(
    () => {
      const e = { g: 0, b: 0 } as unknown as {
        r: number;
        g: number;
        b: number;
      };
      Color.SRgbColor.fromRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `r`, `g`, and `b`",
  );
  assertThrows(
    () => {
      const e = { b: 0, r: 0 } as unknown as {
        r: number;
        g: number;
        b: number;
      };
      Color.SRgbColor.fromRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `r`, `g`, and `b`",
  );
  assertThrows(
    () => {
      const e = { r: 0, g: 0, b: Number.NaN };
      Color.SRgbColor.fromRgbComponents(e);
    },
    TypeError,
    "Input must be an object with the `number`-type properties `r`, `g`, and `b`",
  );
});
