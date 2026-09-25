import * as Rune from "./rune.mts";
import { Radix } from "../numerics/mod.mts";
import { TypeAlias } from "../type/mod.mts";

const _MIN = 0;
const _MAX = 0x10FFFF;

export namespace CodePoint {
  export function isCodePoint(test: unknown): boolean {
    return Number.isSafeInteger(test) &&
      ((test as TypeAlias.safeint) >= _MIN) &&
      ((test as TypeAlias.safeint) <= _MAX);
  }

  export function toString(codepoint: TypeAlias.codepoint): string {
    if (isCodePoint(codepoint) !== true) {
      throw new Error("TODO");
    }
    return `U+${
      codepoint.toString(Radix.HEXADECIMAL).toUpperCase().padStart(
        4,
        Rune.DIGIT_ZERO,
      )
    }`;
  }
}
