import { _T, _U } from "./_common/mod.mts";
import { isNonNegative, Radix } from "./numerics/mod.mts";

type _FormatOptions = {
  radix?: Radix;
  upperCase?: boolean; // parse時は無視
  minLength?: _T.safeint; // parse時は無視
};

export class ByteFormat {
  readonly #radix: Radix;
  readonly #upperCase: boolean;
  readonly #paddingChar: _T.char;
  readonly #minPaddedLength: _T.safeint;

  constructor(options?: _FormatOptions) {
    this.#radix = Object.values(Radix).includes(options?.radix as Radix)
      ? options!.radix!
      : Radix.HEXADECIMAL;
    this.#upperCase = options?.upperCase === true;
    // this.#paddingChar = _T.isNonEmptyString(options?.paddingChar)
    //   ? options.paddingChar.charAt(0)
    //   : "0";//XXX 1-char ではなかった場合エラーにするか
    this.#paddingChar = _U.Char.DIGIT_ZERO;
    this.#minPaddedLength =
      (_T.isSafeInt(options?.minLength) && isNonNegative(options.minLength))
        ? options.minLength
        : 0;
  }

  format(byte: /*_T.uint8*/ _T.safeint): string {
    _T.assertUint8(byte, "Input");

    let str = byte.toString(this.#radix);
    if (this.#upperCase === true) {
      str = str.toUpperCase();
    }

    return str.padStart(this.#minPaddedLength, this.#paddingChar);
  }

  parse(str: string): _T.uint8 {
    _T.assertNonEmptyString(str, "Input");
    if (this.#isFormatMatch(str) !== true) {
      throw new Error("TODO");
    }

    return Number.parseInt(str, this.#radix) as _T.uint8;
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
