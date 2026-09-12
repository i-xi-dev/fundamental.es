import { _Error } from "../_common/mod.mts";
import { safeint } from "./alias.mts";
import { uint8 } from "./_def.mts";

export type * from "./_def.mts";

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

function _inRange(test: safeint, min: safeint, max: safeint): boolean {
  return (test >= min) && (test <= max);
}

export function isUint8(test: unknown): test is uint8 {
  return Number.isSafeInteger(test) && _inRange(test as safeint, 0, 0xFF);
}

export namespace Assert {
  export function bigInt(
    test: unknown,
    targetLabel: string,
  ): asserts test is bigint {
    if (isBigInt(test) !== true) {
      throw _Error.Type.mustBeBigInt(targetLabel);
    }
  }

  export function string(
    test: unknown,
    targetLabel: string,
  ): asserts test is string {
    if (isString(test) !== true) {
      throw _Error.Type.mustBeString(targetLabel);
    }
  }

  export function uint8(
    test: unknown,
    targetLabel: string,
  ): asserts test is uint8 {
    if (isUint8(test) !== true) {
      throw _Error.Type.mustBeUintN(8, targetLabel);
    }
  }
}
