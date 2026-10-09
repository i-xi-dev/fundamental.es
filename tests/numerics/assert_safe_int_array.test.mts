import { assertThrows } from "@std/assert";
import { Numerics } from "../../src/mod.mts";

Deno.test("Numerics.assertSafeIntegerArray()", () => {
  Numerics.assertSafeIntegerArray([], "T1");
  Numerics.assertSafeIntegerArray([1], "T2");

  assertThrows(
    () => {
      Numerics.assertSafeIntegerArray([1, 1.5], "X1");
    },
    TypeError,
    "X1 must be an `Array` of safe-integers of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeIntegerArray([1, 2n], "X2");
    },
    TypeError,
    "X2 must be an `Array` of safe-integers of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeIntegerArray(Uint8Array.of(1), "X3");
    },
    TypeError,
    "X3 must be an `Array` of safe-integers of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeIntegerArray(1, "X4");
    },
    TypeError,
    "X4 must be an `Array` of safe-integers of type `number`",
  );

  assertThrows(
    () => {
      Numerics.assertSafeIntegerArray("1", "X5");
    },
    TypeError,
    "X5 must be an `Array` of safe-integers of type `number`",
  );
});
