import { assertStrictEquals } from "@std/assert";
import { Geometrics } from "../../../src/mod.mts";

Deno.test("Geometrics.Angle.prototype.valueOf()", () => {
  assertStrictEquals(Geometrics.Angle.ofDegrees(0).valueOf(), 0);
  assertStrictEquals(Geometrics.Angle.ofDegrees(360).valueOf(), 0);
  assertStrictEquals(Geometrics.Angle.ofDegrees(1).valueOf(), 1);
  assertStrictEquals(Geometrics.Angle.ofDegrees(0.1).valueOf(), 0.1);
  assertStrictEquals(Geometrics.Angle.ofDegrees(359).valueOf(), 359);
  assertStrictEquals(Geometrics.Angle.ofDegrees(359.9).valueOf(), 359.9);
});
