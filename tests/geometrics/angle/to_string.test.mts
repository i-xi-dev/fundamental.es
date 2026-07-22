import { assertStrictEquals } from "@std/assert";
import { Geometrics } from "../../../src/mod.mts";

Deno.test("Geometrics.Angle.prototype.toString()", () => {
  assertStrictEquals(Geometrics.Angle.ofDegrees(0).toString(), "0 rad");
  assertStrictEquals(Geometrics.Angle.ofDegrees(360).toString(), "0 rad");
  assertStrictEquals(Geometrics.Angle.ofDegrees(180).toString(), "3.142 rad");
  assertStrictEquals(Geometrics.Angle.ofDegrees(90).toString(), "1.571 rad");
  assertStrictEquals(Geometrics.Angle.ofDegrees(450).toString(), "1.571 rad");
});
