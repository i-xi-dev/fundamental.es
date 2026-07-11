import { Exception } from "../../../_internal/mod.mts";

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

export function assertString(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (isString(test) !== true) {
    throw Exception.TypeMismatch.string(targetLabel);
  }
}

export function isChar(test: unknown): test is /*char*/ string {
  return isString(test) && (test.length === 1);
}
