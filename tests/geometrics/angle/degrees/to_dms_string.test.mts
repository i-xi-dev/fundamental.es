import { assertStrictEquals, assertThrows } from "@std/assert";
import { Geometrics } from "../../../../src/mod.mts";

Deno.test("Geometrics.Angle.Degrees.toDmsString()", () => {
  assertStrictEquals(Geometrics.Angle.Degrees.toDmsString(0), "0°00′00″");
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(1234567890),
    "90°00′00″",
  );
  assertStrictEquals(Geometrics.Angle.Degrees.toDmsString(0.1), "0°06′00″");
  assertStrictEquals(Geometrics.Angle.Degrees.toDmsString(0.5), "0°30′00″");
  assertStrictEquals(Geometrics.Angle.Degrees.toDmsString(0.9), "0°54′00″");
  assertStrictEquals(Geometrics.Angle.Degrees.toDmsString(1.23), "1°13′48″");
  assertStrictEquals(Geometrics.Angle.Degrees.toDmsString(1.234), "1°14′02″");
  assertStrictEquals(Geometrics.Angle.Degrees.toDmsString(6.8563), "6°51′23″");

  assertThrows(
    () => {
      Geometrics.Angle.Degrees.toDmsString("0" as unknown as number);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );
});

Deno.test("Geometrics.Angle.Degrees.toDmsString() - fractionalSecondDigits", () => {
  const o2 = { fractionalSecondDigits: 0 } as const;
  assertStrictEquals(Geometrics.Angle.Degrees.toDmsString(0, o2), "0°00′00″");
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(1234567890, o2),
    "90°00′00″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(0.1, o2),
    "0°06′00″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(0.5, o2),
    "0°30′00″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(0.9, o2),
    "0°54′00″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(1.23, o2),
    "1°13′48″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(1.234, o2),
    "1°14′02″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(1.23456, o2),
    "1°14′04″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(6.8563, o2),
    "6°51′23″",
  );

  const o3 = { fractionalSecondDigits: 1 } as const;
  assertStrictEquals(Geometrics.Angle.Degrees.toDmsString(0, o3), "0°00′00.0″");
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(1234567890, o3),
    "90°00′00.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(0.1, o3),
    "0°06′00.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(0.5, o3),
    "0°30′00.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(0.9, o3),
    "0°54′00.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(1.23, o3),
    "1°13′48.0″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(1.234, o3),
    "1°14′02.4″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(1.23456, o3),
    "1°14′04.4″",
  );
  assertStrictEquals(
    Geometrics.Angle.Degrees.toDmsString(6.8563, o3),
    "6°51′22.7″",
  );
});
