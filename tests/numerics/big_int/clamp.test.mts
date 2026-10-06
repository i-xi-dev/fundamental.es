import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

const { BigInteger } = Numerics;

Deno.test("Numerics.BigInteger.clamp()", () => {
  assertThrows(
    () => {
      BigInteger.clamp(undefined as unknown as bigint, 0n, 0n);
    },
    TypeError,
    "Input must be a `bigint`",
  );

  assertThrows(
    () => {
      BigInteger.clamp(0n, undefined as unknown as bigint, 0n);
    },
    TypeError,
    "Lower bound must be a `bigint`",
  );

  assertThrows(
    () => {
      BigInteger.clamp(0n, 0n, undefined as unknown as bigint);
    },
    TypeError,
    "Upper bound must be a `bigint`",
  );

  assertStrictEquals(BigInteger.clamp(0n, 0n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(0n, 0n, 1n), 0n);
  assertStrictEquals(BigInteger.clamp(0n, -1n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(0n, 1n, 1n), 1n);
  assertStrictEquals(BigInteger.clamp(0n, -1n, -1n), -1n);

  assertThrows(
    () => {
      BigInteger.clamp(0n, 1n, 0n); // 負のrange
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );

  assertStrictEquals(BigInteger.clamp(1n, 0n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(1n, 0n, 1n), 1n);
  assertStrictEquals(BigInteger.clamp(1n, -1n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(1n, 1n, 1n), 1n);
  assertStrictEquals(BigInteger.clamp(1n, -1n, -1n), -1n);

  assertStrictEquals(BigInteger.clamp(-1n, 0n, 0n), 0n);
  assertStrictEquals(BigInteger.clamp(-1n, 0n, 1n), 0n);
  assertStrictEquals(BigInteger.clamp(-1n, -1n, 0n), -1n);
  assertStrictEquals(BigInteger.clamp(-1n, 1n, 1n), 1n);
  assertStrictEquals(BigInteger.clamp(-1n, -1n, -1n), -1n);
});
