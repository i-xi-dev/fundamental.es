import { Type } from "../type/mod.mts";

export function isNonEmpty(test: unknown): boolean {
  return Type.isString(test) && (test.length > 0);
}

//TODO Char に移す（または、runeのisBmpにまとめる）
export function isChar(test: unknown): boolean {
  return Type.isString(test) && (test.length === 1);
}
