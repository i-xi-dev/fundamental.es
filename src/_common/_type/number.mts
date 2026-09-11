import { safeint } from "./_typedef/_number.mts";
import { uint8 } from "./_typedef/_uint.mts";

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

function _inRange(test: safeint, min: safeint, max: safeint): boolean {
  return (test >= min) && (test <= max);
}

export function isUint8(test: unknown): test is uint8 {
  return Number.isSafeInteger(test) && _inRange(test as safeint, 0, 0xFF);
}
