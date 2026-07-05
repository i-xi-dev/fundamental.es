import { Exception } from "../../../_internal/mod.mts";

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function assertBigInt(
  test: unknown,
  targetLabel: string,
): asserts test is bigint {
  if (isBigInt(test) !== true) {
    throw Exception.TypeMismatch.bigInt(targetLabel);
  }
}
