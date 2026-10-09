import { assertThrows } from "@std/assert";
import { Numerics } from "../../src/mod.mts";

Deno.test("Numerics.assertFinite()", () => {
  Numerics.assertFinite(1, "T1");
  Numerics.assertFinite(Number.MAX_SAFE_INTEGER, "T2");
  Numerics.assertFinite(Number.MIN_SAFE_INTEGER, "T3");
  Numerics.assertFinite(0, "T4");
  Numerics.assertFinite(-0, "T5");
  Numerics.assertFinite(Number.MAX_SAFE_INTEGER + 1, "T6");
  Numerics.assertFinite(Number.MIN_SAFE_INTEGER - 1, "T7");
  Numerics.assertFinite(1.5, "T8");

  assertThrows(
    () => {
      Numerics.assertFinite(1n, "X1");
    },
    TypeError,
    "X1 must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertFinite("1", "X2");
    },
    TypeError,
    "X2 must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertFinite(Number.NaN, "X3-1");
    },
    TypeError,
    "X3-1 must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertFinite(Number.POSITIVE_INFINITY, "X3-2");
    },
    TypeError,
    "X3-2 must be a finite number of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertFinite(Number.NEGATIVE_INFINITY, "X3-3");
    },
    TypeError,
    "X3-3 must be a finite number of type `number`",
  );
});
