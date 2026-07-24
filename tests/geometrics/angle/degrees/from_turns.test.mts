import { assertStrictEquals, assertThrows } from "@std/assert";
import { Geometrics } from "../../../../src/mod.mts";

Deno.test("Geometrics.Angle.Degrees.fromTurns()", () => {
  assertStrictEquals(Geometrics.Angle.Degrees.fromTurns(0), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.fromTurns(1), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.fromTurns(0.5), 180);
  assertStrictEquals(Geometrics.Angle.Degrees.fromTurns(0.25), 90);
  assertStrictEquals(
    Geometrics.Angle.Degrees.fromTurns(1 + 0.25),
    90,
  );

  assertThrows(
    () => {
      Geometrics.Angle.Degrees.fromTurns("0" as unknown as number);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );
});
