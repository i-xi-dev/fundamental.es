import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Finite.normalize()", () => {
  assertStrictEquals(Object.is(Numerics.Finite.normalize(0), 0), true);
  assertStrictEquals(Object.is(Numerics.Finite.normalize(-0), 0), true);
  assertStrictEquals(Object.is(Numerics.Finite.normalize(-0), -0), false);

  assertThrows(
    () => {
      Numerics.Finite.normalize(Number.POSITIVE_INFINITY);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Finite.normalize(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Finite.normalize(Number.NaN);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );

  assertStrictEquals(
    Numerics.Finite.normalize(Number.MIN_SAFE_INTEGER),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    Numerics.Finite.normalize(Number.MAX_SAFE_INTEGER),
    Number.MAX_SAFE_INTEGER,
  );

  assertThrows(
    () => {
      Numerics.Finite.normalize(0n as unknown as number);
    },
    TypeError,
    "Input must be a finite number of type `number`",
  );
});
