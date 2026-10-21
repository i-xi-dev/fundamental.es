import { assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

Deno.test("Numerics.SafeInteger.assert()", () => {
  Numerics.SafeInteger.assert(1, "T1");
  Numerics.SafeInteger.assert(Number.MAX_SAFE_INTEGER, "T2");
  Numerics.SafeInteger.assert(Number.MIN_SAFE_INTEGER, "T3");
  Numerics.SafeInteger.assert(0, "T4");
  Numerics.SafeInteger.assert(-0, "T5");

  assertThrows(
    () => {
      Numerics.SafeInteger.assert(1n as unknown as number, "X1");
    },
    TypeError,
    "X1 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeInteger.assert("1" as unknown as number, "X2");
    },
    TypeError,
    "X2 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeInteger.assert(Number.NaN, "X3-1");
    },
    TypeError,
    "X3-1 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeInteger.assert(Number.POSITIVE_INFINITY, "X3-2");
    },
    TypeError,
    "X3-2 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeInteger.assert(Number.NEGATIVE_INFINITY, "X3-3");
    },
    TypeError,
    "X3-3 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeInteger.assert(Number.MAX_SAFE_INTEGER + 1, "Y1");
    },
    TypeError,
    "Y1 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeInteger.assert(Number.MIN_SAFE_INTEGER - 1, "Y2");
    },
    TypeError,
    "Y2 must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      Numerics.SafeInteger.assert(1.5, "Y3");
    },
    TypeError,
    "Y3 must be a safe-integer of type `number`",
  );
});
