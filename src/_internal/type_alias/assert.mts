import * as _TypeError from "../../_common/_error/type.mts";
import { isCodePoint, isSafeIntegerArray } from "./check.mts";

export function assertFinite(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isFinite(test) !== true) {
    throw _TypeError.mustBeFinite(targetLabel);
  }
}

export function assertSafeInteger(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isSafeInteger(test) !== true) {
    throw _TypeError.mustBeSafeInteger(targetLabel);
  }
}

export function assertCodePoint(test: unknown, targetLabel: string): void {
  if (isCodePoint(test) !== true) {
    throw _TypeError.mustBeCodePoint(targetLabel);
  }
}

export function assertSafeIntegerArray(
  test: unknown,
  targetLabel: string,
): void {
  if (isSafeIntegerArray(test) !== true) {
    throw _TypeError.mustBeSafeIntArray(targetLabel);
  }
}
