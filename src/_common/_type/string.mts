import { _Type } from "../mod.mts";
import { Type } from "../../type/mod.mts";

//TODO 型以外の条件がある物は外に出す＋戻り値はbooleanにする

export function isNonEmptyString(test: unknown): boolean {
  return Type.isString(test) && (test.length > 0);
}

export function isChar(test: unknown): boolean {
  return Type.isString(test) && (test.length === 1);
}

//TODO CodePoint に移す
export function isCodePoint(test: _Type.safeint): boolean {
  return (test >= 0) && (test <= 0x10FFFF);
}
