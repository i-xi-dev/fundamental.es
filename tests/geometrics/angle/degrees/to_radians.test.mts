import { assertStrictEquals, assertThrows } from "@std/assert";
import { Geometrics } from "../../../../src/mod.mts";

Deno.test("Geometrics.Angle.Degrees.toRadians()", () => {
  assertStrictEquals(Geometrics.Angle.Degrees.toRadians(0), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.toRadians(360), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.toRadians(180), Math.PI);
  assertStrictEquals(Geometrics.Angle.Degrees.toRadians(90), Math.PI / 2);
  assertStrictEquals(Geometrics.Angle.Degrees.toRadians(450), Math.PI / 2);

  assertThrows(
    () => {
      Geometrics.Angle.Degrees.toRadians("0" as unknown as number);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );
});
