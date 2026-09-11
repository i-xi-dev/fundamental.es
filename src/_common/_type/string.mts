import { isSafeInt } from "./number.mts";

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

//TODO 型以外の条件がある物は外に出す＋戻り値はbooleanにする

export function isNonEmptyString(test: unknown): boolean {
  return isString(test) && (test.length > 0);
}

export function isChar(test: unknown): boolean {
  return isString(test) && (test.length === 1);
}

export function isCodePoint(test: unknown): boolean {
  return isSafeInt(test) && (test >= 0) && (test <= 0x10FFFF);
}
