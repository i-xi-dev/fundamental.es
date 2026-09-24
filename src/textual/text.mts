import { Type } from "../type/mod.mts";

export const EMPTY = "";

export function isNonEmpty(test: unknown): boolean {
  return Type.isString(test) && (test.length > 0);
}
