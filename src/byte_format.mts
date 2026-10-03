import * as Type from "./type/mod.mts";
import * as TypeAlias from "./_internal/type_alias/mod.mts";
import { Char16, TextualTypeAssert } from "./textuals/mod.mts";
import { Radix, SafeInt } from "./numerics/mod.mts";

type _FormatOptions = {
  radix?: Radix;
  upperCase?: boolean; // parse時は無視
  minLength?: TypeAlias.safeint; // parse時は無視
};

export class ByteFormat {
  readonly #radix: Radix;
  readonly #upperCase: boolean;
  readonly #paddingChar: TypeAlias.char16;
  readonly #minPaddedLength: TypeAlias.safeint;

  constructor(options?: _FormatOptions) {
    this.#radix = Object.values(Radix).includes(options?.radix as Radix)
      ? options!.radix!
      : Radix.HEXADECIMAL;
    this.#upperCase = options?.upperCase === true;
    // this.#paddingChar = isNonEmptyString(options?.paddingChar)
    //   ? options.paddingChar.charAt(0)
    //   : "0";//XXX 1-char ではなかった場合エラーにするか
    this.#paddingChar = Char16.DIGIT_ZERO;
    this.#minPaddedLength = (Type.isNumber(options?.minLength) &&
        SafeInt.isNonNegative(options.minLength))
      ? options.minLength
      : 0;
  }

  format(byte: /* Type.uint8 */ TypeAlias.safeint): string {
    Type.Assert.uint8(byte, "Input");

    let str = byte.toString(this.#radix);
    if (this.#upperCase === true) {
      str = str.toUpperCase();
    }

    return str.padStart(this.#minPaddedLength, this.#paddingChar);
  }

  parse(str: string): Type.uint8 {
    TextualTypeAssert.nonEmptyString(str, "Input");
    if (this.#isFormatMatch(str) !== true) {
      throw new Error("TODO");
    }

    return Number.parseInt(str, this.#radix) as Type.uint8;
  }

  #isFormatMatch(test: string): boolean {
    switch (this.#radix) {
      case Radix.BINARY:
        return /^[01]+$/.test(test);
      case Radix.OCTAL:
        return /^[0-7]+$/.test(test);
      case Radix.DECIMAL:
        return /^[0-9]+$/.test(test);
      default:
        return /^[0-9A-Fa-f]+$/.test(test);
    }
  }
}

export namespace ByteFormat {
  export type Options = _FormatOptions;
}
