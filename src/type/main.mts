import { _Error } from "../_common/mod.mts";

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isString(test: unknown): test is string {
  return (typeof test === "string");
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
}
