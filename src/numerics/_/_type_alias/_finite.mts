import { _mustBe } from "../../../_/_.mts";

export function _isFinite(test: number): boolean {
  return Number.isFinite(test);
}

function _mustBeFinite(target: string): TypeError {
  return _mustBe("a finite number of type `number`", target);
}

export function _assertFinite(test: number, label: string): void {
  if (Number.isFinite(test) !== true) {
    throw _mustBeFinite(label);
  }
}
