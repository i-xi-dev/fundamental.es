import { assertStrictEquals, assertThrows } from "@std/assert";
import { Geometrics } from "../../../../src/mod.mts";

Deno.test("Geometrics.Angle.Degrees.fromRadians()", () => {
  assertStrictEquals(Geometrics.Angle.Degrees.fromRadians(0), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.fromRadians(Math.PI * 2), 0);
  assertStrictEquals(Geometrics.Angle.Degrees.fromRadians(Math.PI), 180);
  assertStrictEquals(Geometrics.Angle.Degrees.fromRadians(Math.PI / 2), 90);
  assertStrictEquals(
    Geometrics.Angle.Degrees.fromRadians((Math.PI * 2) + (Math.PI / 2)),
    90,
  );

  assertThrows(
    () => {
      Geometrics.Angle.Degrees.fromRadians("0" as unknown as number);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );
});
