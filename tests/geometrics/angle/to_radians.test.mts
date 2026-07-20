import { assertStrictEquals } from "@std/assert";
import { Geometrics } from "../../../src/mod.mts";

Deno.test("Geometrics.Angle.prototype.toRadians()", () => {
  assertStrictEquals(Geometrics.Angle.ofDegrees(0).toRadians(), 0);
  assertStrictEquals(Geometrics.Angle.ofDegrees(360).toRadians(), 0);
  assertStrictEquals(Geometrics.Angle.ofDegrees(180).toRadians(), Math.PI);
  assertStrictEquals(Geometrics.Angle.ofDegrees(90).toRadians(), Math.PI / 2);
  assertStrictEquals(Geometrics.Angle.ofDegrees(450).toRadians(), Math.PI / 2);
});
