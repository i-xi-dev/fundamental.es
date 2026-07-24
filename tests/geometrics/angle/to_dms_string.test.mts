import { assertStrictEquals } from "@std/assert";
import { Geometrics } from "../../../src/mod.mts";

Deno.test("Geometrics.Angle.prototype.toDmsString()", () => {
  assertStrictEquals(Geometrics.Angle.ofDegrees(0).toDmsString(), "0°00′00″");
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1234567890).toDmsString(),
    "90°00′00″",
  );
  assertStrictEquals(Geometrics.Angle.ofDegrees(0.1).toDmsString(), "0°06′00″");
  assertStrictEquals(Geometrics.Angle.ofDegrees(0.5).toDmsString(), "0°30′00″");
  assertStrictEquals(Geometrics.Angle.ofDegrees(0.9).toDmsString(), "0°54′00″");
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1.23).toDmsString(),
    "1°13′48″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1.234).toDmsString(),
    "1°14′02″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(6.8563).toDmsString(),
    "6°51′23″",
  );
});

Deno.test("Geometrics.Angle.prototype.toDmsString() - fractionalSecondDigits", () => {
  const o2 = { fractionalSecondDigits: 0 } as const;
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(0).toDmsString(o2),
    "0°00′00″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1234567890).toDmsString(o2),
    "90°00′00″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(0.1).toDmsString(o2),
    "0°06′00″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(0.5).toDmsString(o2),
    "0°30′00″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(0.9).toDmsString(o2),
    "0°54′00″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1.23).toDmsString(o2),
    "1°13′48″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1.234).toDmsString(o2),
    "1°14′02″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1.23456).toDmsString(o2),
    "1°14′04″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(6.8563).toDmsString(o2),
    "6°51′23″",
  );

  const o3 = { fractionalSecondDigits: 1 } as const;
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(0).toDmsString(o3),
    "0°00′00.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1234567890).toDmsString(o3),
    "90°00′00.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(0.1).toDmsString(o3),
    "0°06′00.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(0.5).toDmsString(o3),
    "0°30′00.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(0.9).toDmsString(o3),
    "0°54′00.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1.23).toDmsString(o3),
    "1°13′48.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1.234).toDmsString(o3),
    "1°14′02.4″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(1.23456).toDmsString(o3),
    "1°14′04.4″",
  );
  assertStrictEquals(
    Geometrics.Angle.ofDegrees(6.8563).toDmsString(o3),
    "6°51′22.7″",
  );
});
