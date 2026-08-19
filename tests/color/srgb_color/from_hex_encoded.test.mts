import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.fromHexEncoded()", () => {
  const c1 = Color.SRgbColor.fromHexEncoded("FEFDFC");
  assertStrictEquals(c1.red, 254 / 255);
  assertStrictEquals(c1.green, 253 / 255);
  assertStrictEquals(c1.blue, 252 / 255);

  const c1b = Color.SRgbColor.fromHexEncoded("fefdfc");
  assertStrictEquals(c1b.red, 254 / 255);
  assertStrictEquals(c1b.green, 253 / 255);
  assertStrictEquals(c1b.blue, 252 / 255);

  const c1c = Color.SRgbColor.fromHexEncoded("#fefdfc");
  assertStrictEquals(c1c.red, 254 / 255);
  assertStrictEquals(c1c.green, 253 / 255);
  assertStrictEquals(c1c.blue, 252 / 255);

  assertThrows(
    () => {
      Color.SRgbColor.fromHexEncoded("00000");
    },
    TypeError,
    'Input must be a hexadecimal color value in the "RRGGBB" format',
  );

  assertThrows(
    () => {
      Color.SRgbColor.fromHexEncoded("0000000");
    },
    TypeError,
    'Input must be a hexadecimal color value in the "RRGGBB" format',
  );

  assertThrows(
    () => {
      Color.SRgbColor.fromHexEncoded("#00000");
    },
    TypeError,
    'Input must be a hexadecimal color value in the "RRGGBB" format',
  );

  assertThrows(
    () => {
      Color.SRgbColor.fromHexEncoded("#0000000");
    },
    TypeError,
    'Input must be a hexadecimal color value in the "RRGGBB" format',
  );

  assertThrows(
    () => {
      Color.SRgbColor.fromHexEncoded(0 as unknown as string);
    },
    TypeError,
    "Input must be a `string`",
  );
});
