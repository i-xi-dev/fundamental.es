import { assertStrictEquals, assertThrows } from "@std/assert";
import { Geometrics } from "../../../src/mod.mts";

Deno.test("Geometrics.Angle.ofRadians()", () => {
  assertStrictEquals(Geometrics.Angle.ofRadians(0).toDegrees(), 0);
  assertStrictEquals(Geometrics.Angle.ofRadians(Math.PI * 2).toDegrees(), 0);
  assertStrictEquals(Geometrics.Angle.ofRadians(Math.PI).toDegrees(), 180);
  assertStrictEquals(Geometrics.Angle.ofRadians(Math.PI / 2).toDegrees(), 90);
  assertStrictEquals(
    Geometrics.Angle.ofRadians((Math.PI * 2) + (Math.PI / 2)).toDegrees(),
    90,
  );

  assertThrows(
    () => {
      Geometrics.Angle.ofRadians("0" as unknown as number);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );
});
