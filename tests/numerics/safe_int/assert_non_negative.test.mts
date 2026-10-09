import { assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

const { SafeInteger } = Numerics;

Deno.test("Numerics.SafeInteger.assertNonNegative()", () => {
  SafeInteger.assertNonNegative(0, "T1");
  SafeInteger.assertNonNegative(-0, "T2");
  SafeInteger.assertNonNegative(1, "T3");

  assertThrows(
    () => {
      SafeInteger.assertNonNegative(-1, "X1");
    },
    RangeError,
    "X1 must be a `number` within the range of non-negative safe-integer",
  );
});
