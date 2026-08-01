import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Finite.clamp()", () => {
  assertThrows(
    () => {
      Numerics.Finite.clamp(undefined as unknown as number, 0, 0);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Finite.clamp(0, undefined as unknown as number, 0);
    },
    TypeError,
    "Lower bound must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Finite.clamp(0, 0, undefined as unknown as number);
    },
    TypeError,
    "Upper bound must be a finite number of type `number`",
  );

  assertStrictEquals(Numerics.Finite.clamp(0, 0, 0), 0);
  assertStrictEquals(Numerics.Finite.clamp(0, 0, 1), 0);
  assertStrictEquals(Numerics.Finite.clamp(0, -1, 0), 0);
  assertStrictEquals(Numerics.Finite.clamp(0, 1, 1), 1);
  assertStrictEquals(Numerics.Finite.clamp(0, -1, -1), -1);

  assertThrows(
    () => {
      Numerics.Finite.clamp(0, 1, 0); // 負のrange
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );

  assertThrows(
    () => {
      Numerics.Finite.clamp(0, 0, -1); // 負のrange
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );

  assertStrictEquals(Numerics.Finite.clamp(0.5, 0, 0), 0);
  assertStrictEquals(Numerics.Finite.clamp(0.5, 0, 1), 0.5);
  assertStrictEquals(Numerics.Finite.clamp(0.5, -1, 0), 0);
  assertStrictEquals(Numerics.Finite.clamp(0.5, 1, 1), 1);
  assertStrictEquals(Numerics.Finite.clamp(0.5, -1, -1), -1);

  assertStrictEquals(Numerics.Finite.clamp(1, 0, 0), 0);
  assertStrictEquals(Numerics.Finite.clamp(1, 0, 1), 1);
  assertStrictEquals(Numerics.Finite.clamp(1, -1, 0), 0);
  assertStrictEquals(Numerics.Finite.clamp(1, 1, 1), 1);
  assertStrictEquals(Numerics.Finite.clamp(1, -1, -1), -1);

  assertThrows(
    () => {
      Numerics.Finite.clamp(1, 1, 0); // 負のrange
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );

  assertThrows(
    () => {
      Numerics.Finite.clamp(1, 0, -1); // 負のrange
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );

  assertStrictEquals(Numerics.Finite.clamp(-0.5, 0, 0), 0);
  assertStrictEquals(Numerics.Finite.clamp(-0.5, 0, 1), 0);
  assertStrictEquals(Numerics.Finite.clamp(-0.5, -1, 0), -0.5);
  assertStrictEquals(Numerics.Finite.clamp(-0.5, 1, 1), 1);
  assertStrictEquals(Numerics.Finite.clamp(-0.5, -1, -1), -1);

  assertStrictEquals(Numerics.Finite.clamp(-1, 0, 0), 0);
  assertStrictEquals(Numerics.Finite.clamp(-1, 0, 1), 0);
  assertStrictEquals(Numerics.Finite.clamp(-1, -1, 0), -1);
  assertStrictEquals(Numerics.Finite.clamp(-1, 1, 1), 1);
  assertStrictEquals(Numerics.Finite.clamp(-1, -1, -1), -1);

  assertThrows(
    () => {
      Numerics.Finite.clamp(-1, 1, 0); // 負のrange
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );

  assertThrows(
    () => {
      Numerics.Finite.clamp(-1, 0, -1); // 負のrange
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );
});
