import { assertStrictEquals, assertThrows } from "@std/assert";
import { Color } from "../../../src/mod.mts";

Deno.test("Color.SRgbColor.fromBytes()", () => {
  const c1 = Color.SRgbColor.fromBytes(Uint8Array.of(254, 253, 252));
  assertStrictEquals(c1.red, 254 / 255);
  assertStrictEquals(c1.green, 253 / 255);
  assertStrictEquals(c1.blue, 252 / 255);

  const c2 = Color.SRgbColor.fromBytes(Uint8Array.of(255, 254, 253, 252));
  assertStrictEquals(c2.red, 255 / 255);
  assertStrictEquals(c2.green, 254 / 255);
  assertStrictEquals(c2.blue, 253 / 255);

  const c2b = Color.SRgbColor.fromBytes(Uint8Array.of(255, 254, 253, 252));
  assertStrictEquals(c2b.red, 255 / 255);
  assertStrictEquals(c2b.green, 254 / 255);
  assertStrictEquals(c2b.blue, 253 / 255);

  assertThrows(
    () => {
      Color.SRgbColor.fromBytes(Uint8Array.of(254, 253));
    },
    TypeError,
    "Input must be an `Uint8Array` with a length of 3",
  );

  assertThrows(
    () => {
      Color.SRgbColor.fromBytes(Uint8Array.of(254));
    },
    TypeError,
    "Input must be an `Uint8Array` with a length of 3",
  );

  assertThrows(
    () => {
      Color.SRgbColor.fromBytes(Uint8Array.of());
    },
    TypeError,
    "Input must be an `Uint8Array` with a length of 3",
  );

  assertThrows(
    () => {
      Color.SRgbColor.fromBytes([] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );
});
