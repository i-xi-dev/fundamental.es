import { assertStrictEquals, assertThrows } from "@std/assert";
import { Geometrics } from "../../../../src/mod.mts";

Deno.test("Geometrics.Angle.Degrees.normalize()", () => {
  assertStrictEquals(Geometrics.Angle.Degrees.normalize(0), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.normalize(360), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.normalize(1), 1);
  assertStrictEquals(Geometrics.Angle.Degrees.normalize(0.1), 0.1);
  assertStrictEquals(Geometrics.Angle.Degrees.normalize(359), 359);
  assertStrictEquals(Geometrics.Angle.Degrees.normalize(359.9), 359.9);
  assertStrictEquals(
    Geometrics.Angle.Degrees.normalize(360.1).toFixed(6),
    (0.1).toFixed(6),
  ); // JSの精度の問題
  assertStrictEquals(Geometrics.Angle.Degrees.normalize(-0.1), 359.9);

  assertThrows(
    () => {
      Geometrics.Angle.Degrees.normalize("0" as unknown as number);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );
});
