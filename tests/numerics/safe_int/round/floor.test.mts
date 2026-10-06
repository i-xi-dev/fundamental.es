import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

const { RoundingMode, SafeInteger } = Numerics;

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("Numerics.SafeInteger.round() - roundingMode:FLOOR", () => {
  const op = RoundingMode.FLOOR;

  assertStrictEquals(SafeInteger.round(-2, op), -2);
  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.8, op), -2);
  assertStrictEquals(SafeInteger.round(-1.7, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.4, op), -2);
  assertStrictEquals(SafeInteger.round(-1.3, op), -2);
  assertStrictEquals(SafeInteger.round(-1.2, op), -2);
  assertStrictEquals(SafeInteger.round(-1.1, op), -2);
  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.8, op), -1);
  assertStrictEquals(SafeInteger.round(-0.7, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.4, op), -1);
  assertStrictEquals(SafeInteger.round(-0.3, op), -1);
  assertStrictEquals(SafeInteger.round(-0.2, op), -1);
  assertStrictEquals(SafeInteger.round(-0.1, op), -1);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.2, op), 0);
  assertStrictEquals(SafeInteger.round(0.3, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.7, op), 0);
  assertStrictEquals(SafeInteger.round(0.8, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.2, op), 1);
  assertStrictEquals(SafeInteger.round(1.3, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.6, op), 1);
  assertStrictEquals(SafeInteger.round(1.7, op), 1);
  assertStrictEquals(SafeInteger.round(1.8, op), 1);
  assertStrictEquals(SafeInteger.round(1.9, op), 1);
  assertStrictEquals(SafeInteger.round(2, op), 2);

  assertStrictEquals(SafeInteger.round(MAX, op), MAX);
  assertStrictEquals(SafeInteger.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5, op), -9);
  assertStrictEquals(SafeInteger.round(-7.5, op), -8);
  assertStrictEquals(SafeInteger.round(-6.5, op), -7);
  assertStrictEquals(SafeInteger.round(-5.5, op), -6);
  assertStrictEquals(SafeInteger.round(-4.5, op), -5);
  assertStrictEquals(SafeInteger.round(-3.5, op), -4);
  assertStrictEquals(SafeInteger.round(-2.5, op), -3);

  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -2);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), -1);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 1);

  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(3.5, op), 3);
  assertStrictEquals(SafeInteger.round(4.5, op), 4);
  assertStrictEquals(SafeInteger.round(5.5, op), 5);
  assertStrictEquals(SafeInteger.round(6.5, op), 6);
  assertStrictEquals(SafeInteger.round(7.5, op), 7);
  assertStrictEquals(SafeInteger.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});
