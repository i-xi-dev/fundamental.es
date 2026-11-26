import { _mustBe } from "../../../_/_.mts";

export function _isSafeInteger(test: number): boolean {
  return Number.isSafeInteger(test);
}

export function _mustBeSafeInteger(target: string): TypeError {
  return _mustBe("a safe-integer of type `number`", target);
}

export function _assertSafeInteger(test: number, label: string): void {
  if (_isSafeInteger(test) !== true) {
    throw _mustBeSafeInteger(label);
  }
}
