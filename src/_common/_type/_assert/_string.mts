import { _TypeError } from "../../../_internal/mod.mts";

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

export function assertString(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (isString(test) !== true) {
    throw _TypeError.string(targetLabel);
  }
}

export function isNonEmptyString(test: unknown): test is string {
  return isString(test) && (test.length > 0);
}

export function assertNonEmptyString(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (isNonEmptyString(test) !== true) {
    throw _TypeError.nonEmptyString(targetLabel);
  }
}

export function isChar(test: unknown): test is /*char*/ string {
  return isString(test) && (test.length === 1);
}
