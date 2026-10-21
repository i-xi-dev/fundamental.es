import { _isSafeInt } from "../../numerics/_internal/common.mts";
import { Type } from "../../type/mod.mts";

export function isChar16(test: unknown): boolean {
  return Type.isString(test) && (test.length === 1);
}

export function isChar32(test: unknown): boolean {
  if (Type.isString(test) === true) {
    if (test.length === 1) {
      return true;
    } else if (test.length === 2) {
      // return test.isWellFormed() && ([...test].length === 1);
      return [...test].length === 1; // lone surrogate を許容
    }
  }
  return false;
}

export function isSafeIntegerArray(test: unknown): boolean {
  return Array.isArray(test) && test.every((i) => _isSafeInt(i));
}
