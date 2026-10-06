import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import { Type } from "../../type/mod.mts";

export function isSafeIntArray(
  test: unknown,
): test is Array<TypeAlias.safeint> {
  return Array.isArray(test) && test.every((i) => Number.isSafeInteger(i));
}

//TODO こっちにする
export function isTArray<T>(
  test: unknown,
  itest: (item: unknown) => item is T,
): test is Array<T> {
  return Array.isArray(test) && test.every(itest);
}
