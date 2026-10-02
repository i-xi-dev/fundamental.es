import * as Type from "../type/mod.mts";

export function _isNonEmptyString(test: unknown): boolean {
  return Type.isString(test) && (test.length > 0);
}
