import { _isSafeInt } from "../../numerics/_internal/common.mts";

export function isSafeIntegerArray(test: unknown): boolean {
  return Array.isArray(test) && test.every((i) => _isSafeInt(i));
}
