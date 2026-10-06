import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../src/mod.mts";

const { SafeInteger } = Numerics;

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("Numerics.SafeInteger.round()", () => {
  const rfe1 = "Input must be a finite number of type `number`";

  assertThrows(
    () => {
      SafeInteger.round(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.round(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.round(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.round(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.round(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInteger.round(-1), -1);
  assertStrictEquals(SafeInteger.round(-0), 0);
  assertStrictEquals(Object.is(SafeInteger.round(-0), 0), true);
  assertStrictEquals(SafeInteger.round(0), 0);
  assertStrictEquals(SafeInteger.round(1), 1);

  assertStrictEquals(SafeInteger.round(MAX), MAX);
  assertStrictEquals(SafeInteger.round(MIN), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MIN + 0.9), MIN + 1);
  assertStrictEquals(SafeInteger.round(MIN + 0.1), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.1), MIN);
  assertStrictEquals(SafeInteger.round(MIN - 0.9), MIN - 1);
  // <<<

  assertStrictEquals(SafeInteger.round(-8.5), -9);
  assertStrictEquals(SafeInteger.round(-7.5), -8);
  assertStrictEquals(SafeInteger.round(-6.5), -7);
  assertStrictEquals(SafeInteger.round(-5.5), -6);
  assertStrictEquals(SafeInteger.round(-4.5), -5);
  assertStrictEquals(SafeInteger.round(-3.5), -4);
  assertStrictEquals(SafeInteger.round(-2.5), -3);

  assertStrictEquals(SafeInteger.round(-1.9), -2);
  assertStrictEquals(SafeInteger.round(-1.6), -2);
  assertStrictEquals(SafeInteger.round(-1.55), -2);
  assertStrictEquals(SafeInteger.round(-1.5), -2);
  assertStrictEquals(SafeInteger.round(-1.45), -1);
  assertStrictEquals(SafeInteger.round(-1.4), -1);
  assertStrictEquals(SafeInteger.round(-1.1), -1);

  assertStrictEquals(SafeInteger.round(-0.9), -1);
  assertStrictEquals(SafeInteger.round(-0.6), -1);
  assertStrictEquals(SafeInteger.round(-0.55), -1);
  assertStrictEquals(SafeInteger.round(-0.5), -1);
  assertStrictEquals(SafeInteger.round(-0.45), 0);
  assertStrictEquals(SafeInteger.round(-0.4), 0);
  assertStrictEquals(SafeInteger.round(-0.1), 0);

  assertStrictEquals(SafeInteger.round(0.1), 0);
  assertStrictEquals(SafeInteger.round(0.4), 0);
  assertStrictEquals(SafeInteger.round(0.45), 0);
  assertStrictEquals(SafeInteger.round(0.5), 1);
  assertStrictEquals(SafeInteger.round(0.55), 1);
  assertStrictEquals(SafeInteger.round(0.6), 1);
  assertStrictEquals(SafeInteger.round(0.9), 1);

  assertStrictEquals(SafeInteger.round(1.1), 1);
  assertStrictEquals(SafeInteger.round(1.4), 1);
  assertStrictEquals(SafeInteger.round(1.45), 1);
  assertStrictEquals(SafeInteger.round(1.5), 2);
  assertStrictEquals(SafeInteger.round(1.55), 2);
  assertStrictEquals(SafeInteger.round(1.6), 2);
  assertStrictEquals(SafeInteger.round(1.9), 2);

  assertStrictEquals(SafeInteger.round(2.5), 3);
  assertStrictEquals(SafeInteger.round(3.5), 4);
  assertStrictEquals(SafeInteger.round(4.5), 5);
  assertStrictEquals(SafeInteger.round(5.5), 6);
  assertStrictEquals(SafeInteger.round(6.5), 7);
  assertStrictEquals(SafeInteger.round(7.5), 8);
  assertStrictEquals(SafeInteger.round(8.5), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9), MAX + 1);
  // <<<
});

Deno.test("Numerics.SafeInteger.round() - roundingMode:unknown", () => {
  // roundingMode:HALF_EXPAND として処理する
  const op = "hoge" as "ceil";

  assertStrictEquals(SafeInteger.round(-1, op), -1);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);

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

  assertStrictEquals(SafeInteger.round(-1.9, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.1, op), -1);

  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.1, op), 0);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(2.5, op), 3);
  assertStrictEquals(SafeInteger.round(3.5, op), 4);
  assertStrictEquals(SafeInteger.round(4.5, op), 5);
  assertStrictEquals(SafeInteger.round(5.5, op), 6);
  assertStrictEquals(SafeInteger.round(6.5, op), 7);
  assertStrictEquals(SafeInteger.round(7.5, op), 8);
  assertStrictEquals(SafeInteger.round(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.round(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.round(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.round(MAX + 0.9, op), MAX + 1);
  // <<<
});
