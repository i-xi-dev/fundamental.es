import { assertStrictEquals, assertThrows } from "@std/assert";
import { Geometrics } from "../../../../src/mod.mts";

Deno.test("Geometrics.Angle.Degrees.fromGradians()", () => {
  assertStrictEquals(Geometrics.Angle.Degrees.fromGradians(0), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.fromGradians(400), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.fromGradians(200), 180);
  assertStrictEquals(Geometrics.Angle.Degrees.fromGradians(100), 90);
  assertStrictEquals(
    Geometrics.Angle.Degrees.fromGradians(400 + 100),
    90,
  );

  assertThrows(
    () => {
      Geometrics.Angle.Degrees.fromGradians("0" as unknown as number);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );
});
