import { Type } from "../type/mod.mts";

export function isChar(test: unknown): boolean {
  return Type.isString(test) && (test.length === 1);
}
