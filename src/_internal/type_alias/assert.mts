import * as Exception from "./error.mts";
import { isCodePoint, isSafeIntegerArray } from "./check.mts";

export function assertFinite(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isFinite(test) !== true) {
    throw Exception.mustBeFinite(targetLabel);
  }
}

export function assertSafeInteger(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isSafeInteger(test) !== true) {
    throw Exception.mustBeSafeInteger(targetLabel);
  }
}

export function assertCodePoint(test: unknown, targetLabel: string): void {
  if (isCodePoint(test) !== true) {
    throw Exception.mustBeCodePoint(targetLabel);
  }
}

export function assertSafeIntegerArray(
  test: unknown,
  targetLabel: string,
): void {
  if (isSafeIntegerArray(test) !== true) {
    throw Exception.mustBeSafeIntegerArray(targetLabel);
  }
}
