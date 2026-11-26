import { _mustBe } from "../_.mts";

// realm違いは偽になる
export function _isArrayBuffer(test: unknown): test is ArrayBuffer {
  return test instanceof ArrayBuffer;
}

function _mustBeArrayBuffer(target: string): TypeError {
  return _mustBe("an `ArrayBuffer`", target);
}

export function _assertArrayBuffer(
  test: unknown,
  label: string,
): asserts test is ArrayBuffer {
  if (_isArrayBuffer(test) !== true) {
    throw _mustBeArrayBuffer(label);
  }
}
