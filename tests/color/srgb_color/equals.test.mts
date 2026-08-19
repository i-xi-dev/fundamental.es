import { assertStrictEquals } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.prototype.equals()", () => {
  const c1 = Color.SRgbColor.fromRgb24({ r: 255, g: 128, b: 64 });
  const c1b = Color.SRgbColor.fromRgb24({ r: 255, g: 128, b: 64 });
  const c2 = Color.SRgbColor.fromRgb24({ r: 254, g: 128, b: 64 });
  const c3 = Color.SRgbColor.fromRgb24({ r: 255, g: 127, b: 64 });
  const c4 = Color.SRgbColor.fromRgb24({ r: 255, g: 128, b: 63 });
  const c5 = Color.SRgbColor.fromRgb24({ r: 256, g: 128, b: 64 });
  const c11 = Color.SRgbColor.fromRgbComponents({ r: 1, g: 0.5, b: 0.25 });
  const c12 = Color.SRgbColor.fromRgbComponents({ r: 0.9999, g: 0.5, b: 0.25 });
  const c13 = Color.SRgbColor.fromRgbComponents({ r: 1, g: 0.5018, b: 0.25 });
  const c14 = Color.SRgbColor.fromRgbComponents({ r: 1, g: 0.5, b: 0.2510 });
  assertStrictEquals(c1.equals(c1), true);
  assertStrictEquals(c1.equals(c1b), true);
  assertStrictEquals(c1.equals(c2), false);
  assertStrictEquals(c1.equals(c3), false);
  assertStrictEquals(c1.equals(c4), false);
  assertStrictEquals(c1.equals(c5), true); // 255に丸められるので
  assertStrictEquals(c1.equals(c11), true);
  assertStrictEquals(c1.equals(c12), true);
  assertStrictEquals(c1.equals(c13), true);
  console.log(JSON.stringify(c14.toRgb24()));
  assertStrictEquals(c1.equals(c14), true);

  assertStrictEquals(
    c1.equals({ r: 255, g: 128, b: 64 } as unknown as Color.SRgbColor),
    false,
  );
  assertStrictEquals(
    c1.equals(null as unknown as Color.SRgbColor),
    false,
  );
});
