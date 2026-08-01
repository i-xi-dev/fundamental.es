import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

const { RoundingMode } = Numerics;

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("Numerics.SafeInt.round() - roundingMode:HALF_EVEN", () => {
  const op = RoundingMode.HALF_EVEN;

  assertStrictEquals(Numerics.SafeInt.round(-2, op), -2);
  assertStrictEquals(Numerics.SafeInt.round(-1.9, op), -2);
  assertStrictEquals(Numerics.SafeInt.round(-1.8, op), -2);
  assertStrictEquals(Numerics.SafeInt.round(-1.7, op), -2);
  assertStrictEquals(Numerics.SafeInt.round(-1.6, op), -2);
  assertStrictEquals(Numerics.SafeInt.round(-1.5, op), -2);
  assertStrictEquals(Numerics.SafeInt.round(-1.4, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-1.3, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-1.2, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-1.1, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-1, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-0.9, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-0.8, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-0.7, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-0.6, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-0.5, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(-0.4, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(-0.3, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(-0.2, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(-0.1, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(0, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(0.1, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(0.2, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(0.3, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(0.4, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(0.5, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(0.6, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(0.7, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(0.8, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(0.9, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(1, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(1.1, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(1.2, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(1.3, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(1.4, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(1.5, op), 2);
  assertStrictEquals(Numerics.SafeInt.round(1.6, op), 2);
  assertStrictEquals(Numerics.SafeInt.round(1.7, op), 2);
  assertStrictEquals(Numerics.SafeInt.round(1.8, op), 2);
  assertStrictEquals(Numerics.SafeInt.round(1.9, op), 2);
  assertStrictEquals(Numerics.SafeInt.round(2, op), 2);

  assertStrictEquals(Numerics.SafeInt.round(MAX, op), MAX);
  assertStrictEquals(Numerics.SafeInt.round(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Numerics.SafeInt.round(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Numerics.SafeInt.round(MIN + 0.1, op), MIN);
  assertStrictEquals(Numerics.SafeInt.round(MIN - 0.1, op), MIN);
  assertStrictEquals(Numerics.SafeInt.round(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Numerics.SafeInt.round(-8.5, op), -8);
  assertStrictEquals(Numerics.SafeInt.round(-7.5, op), -8);
  assertStrictEquals(Numerics.SafeInt.round(-6.5, op), -6);
  assertStrictEquals(Numerics.SafeInt.round(-5.5, op), -6);
  assertStrictEquals(Numerics.SafeInt.round(-4.5, op), -4);
  assertStrictEquals(Numerics.SafeInt.round(-3.5, op), -4);
  assertStrictEquals(Numerics.SafeInt.round(-2.5, op), -2);

  assertStrictEquals(Numerics.SafeInt.round(-1.55, op), -2);
  assertStrictEquals(Numerics.SafeInt.round(-1.45, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-0.55, op), -1);
  assertStrictEquals(Numerics.SafeInt.round(-0.45, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(0.45, op), 0);
  assertStrictEquals(Numerics.SafeInt.round(0.55, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(1.45, op), 1);
  assertStrictEquals(Numerics.SafeInt.round(1.55, op), 2);

  assertStrictEquals(Numerics.SafeInt.round(2.5, op), 2);
  assertStrictEquals(Numerics.SafeInt.round(3.5, op), 4);
  assertStrictEquals(Numerics.SafeInt.round(4.5, op), 4);
  assertStrictEquals(Numerics.SafeInt.round(5.5, op), 6);
  assertStrictEquals(Numerics.SafeInt.round(6.5, op), 6);
  assertStrictEquals(Numerics.SafeInt.round(7.5, op), 8);
  assertStrictEquals(Numerics.SafeInt.round(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Numerics.SafeInt.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Numerics.SafeInt.round(MAX - 0.1, op), MAX);
  assertStrictEquals(Numerics.SafeInt.round(MAX + 0.1, op), MAX);
  assertStrictEquals(Numerics.SafeInt.round(MAX + 0.9, op), MAX + 1);
  // <<<
});
