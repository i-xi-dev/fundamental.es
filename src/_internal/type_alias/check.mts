import type { safeint } from "./_def.mts";
import * as _TypeError from "../../_common/_error/type.mts";
import { Type } from "../../type/mod.mts";

const _MIN_CODE_POINT = 0;
const _MAX_CODE_POINT = 0x10FFFF;

export function isCodePoint(test: unknown): boolean {
  return Number.isSafeInteger(test) &&
    ((test as safeint) >= _MIN_CODE_POINT) &&
    ((test as safeint) <= _MAX_CODE_POINT);
}

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
  return Array.isArray(test) && test.every((i) => Number.isSafeInteger(i));
}
