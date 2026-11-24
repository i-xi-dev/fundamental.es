import { assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.assertSafeInteger()", () => {
  Numerics.assertSafeInteger(1, "T1");
  Numerics.assertSafeInteger(Number.MAX_SAFE_INTEGER, "T2");
  Numerics.assertSafeInteger(Number.MIN_SAFE_INTEGER, "T3");
  Numerics.assertSafeInteger(0, "T4");
  Numerics.assertSafeInteger(-0, "T5");

  assertThrows(
    () => {
      Numerics.assertSafeInteger(1n as unknown as number, "X1");
    },
    TypeError,
    "X1 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeInteger("1" as unknown as number, "X2");
    },
    TypeError,
    "X2 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeInteger(Number.NaN, "X3-1");
    },
    TypeError,
    "X3-1 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeInteger(Number.POSITIVE_INFINITY, "X3-2");
    },
    TypeError,
    "X3-2 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeInteger(Number.NEGATIVE_INFINITY, "X3-3");
    },
    TypeError,
    "X3-3 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeInteger(Number.MAX_SAFE_INTEGER + 1, "Y1");
    },
    TypeError,
    "Y1 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeInteger(Number.MIN_SAFE_INTEGER - 1, "Y2");
    },
    TypeError,
    "Y2 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeInteger(1.5, "Y3");
    },
    TypeError,
    "Y3 must be a safe-integer of type `number`",
  );
});
