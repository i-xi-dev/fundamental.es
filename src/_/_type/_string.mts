import { _mustBe } from "../_.mts";

export function _isString(test: unknown): test is string {
  return (typeof test === "string");
}

function _mustBeString(target: string): TypeError {
  return _mustBe("a `string`", target);
}

export function _assertString(
  test: unknown,
  label: string,
): asserts test is string {
  if (_isString(test) !== true) {
    throw _mustBeString(label);
  }
}
