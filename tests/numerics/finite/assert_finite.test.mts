import { assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.Finite.assert()", () => {
  Numerics.Finite.assert(1, "T1");
  Numerics.Finite.assert(Number.MAX_SAFE_INTEGER, "T2");
  Numerics.Finite.assert(Number.MIN_SAFE_INTEGER, "T3");
  Numerics.Finite.assert(0, "T4");
  Numerics.Finite.assert(-0, "T5");
  Numerics.Finite.assert(Number.MAX_SAFE_INTEGER + 1, "T6");
  Numerics.Finite.assert(Number.MIN_SAFE_INTEGER - 1, "T7");
  Numerics.Finite.assert(1.5, "T8");

  assertThrows(
    () => {
      Numerics.Finite.assert(1n as unknown as number, "X1");
    },
    TypeError,
    "X1 must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Finite.assert("1" as unknown as number, "X2");
    },
    TypeError,
    "X2 must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Finite.assert(Number.NaN, "X3-1");
    },
    TypeError,
    "X3-1 must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Finite.assert(Number.POSITIVE_INFINITY, "X3-2");
    },
    TypeError,
    "X3-2 must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.Finite.assert(Number.NEGATIVE_INFINITY, "X3-3");
    },
    TypeError,
    "X3-3 must be a finite number of type `number`",
  );
});
