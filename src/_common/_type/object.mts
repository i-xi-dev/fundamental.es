import { Type, TypeAlias } from "../../type/mod.mts";

export function isSafeIntArray(
  test: unknown,
): test is Array<TypeAlias.safeint> {
  return Array.isArray(test) && test.every((i) => Number.isSafeInteger(i));
}
