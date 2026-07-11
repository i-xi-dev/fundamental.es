import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.fromBigUint128()", () => {
  const u0 = Uuid.fromBigUint128(0x0123456789ABCDEF0123456789ABCDEFn);
  assertStrictEquals(u0.toString(), "01234567-89ab-cdef-0123-456789abcdef");

  assertThrows(
    () => {
      Uuid.fromBigUint128(0 as unknown as bigint);
    },
    TypeError,
    "Input must be an UUID of type `bigint`",
  );

  assertThrows(
    () => {
      Uuid.fromBigUint128(-1n);
    },
    TypeError,
    "Input must be an UUID of type `bigint`",
  );

  assertThrows(
    () => {
      Uuid.fromBigUint128(0x100000000000000000000000000000000n);
    },
    TypeError,
    "Input must be an UUID of type `bigint`",
  );
});
