import { assertStrictEquals, assertThrows } from "@std/assert";
import { Geometrics } from "../../../src/mod.mts";

Deno.test("Geometrics.Angle.ofDegrees()", () => {
  assertStrictEquals(Geometrics.Angle.ofDegrees(0).toDegrees(), 0);
  assertStrictEquals(Geometrics.Angle.ofDegrees(360).toDegrees(), 0);
  assertStrictEquals(Geometrics.Angle.ofDegrees(1).toDegrees(), 1);
  assertStrictEquals(Geometrics.Angle.ofDegrees(0.1).toDegrees(), 0.1);
  assertStrictEquals(Geometrics.Angle.ofDegrees(359).toDegrees(), 359);
  assertStrictEquals(Geometrics.Angle.ofDegrees(359.9).toDegrees(), 359.9);

  assertThrows(
    () => {
      Geometrics.Angle.ofDegrees("0" as unknown as number);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );
});
