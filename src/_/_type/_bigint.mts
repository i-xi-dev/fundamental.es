import { __mustBe } from "../../type/error.mts";

export function _isBigInteger(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function _mustBeBigInteger(target: string): TypeError {
  return __mustBe("a `bigint`", target);
}

export function _assertBigInteger(
  test: unknown,
  label: string,
): asserts test is bigint {
  if (_isBigInteger(test) !== true) {
    throw _mustBeBigInteger(label);
  }
}
