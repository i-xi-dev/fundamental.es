import { _T, Radix } from "./_common/mod.mts";

type _FormatOptions = {
  radix?: Radix;
  upperCase?: boolean;
  paddingChar?: _T.char;
  minPaddedLength?: _T.safeint;
};

export class ByteFormat {
  readonly #radix: Radix;
  readonly #upperCase: boolean;
  readonly #paddingChar: _T.char; //XXX 1-char ではなかった場合エラーにするか
  readonly #minPaddedLength: _T.safeint;

  constructor(options?: _FormatOptions) {
    this.#radix = Object.values(Radix).includes(options?.radix as Radix)
      ? options!.radix!
      : Radix.HEXADECIMAL;
    this.#upperCase = options?.upperCase === true;
    this.#paddingChar = _T.isNonEmptyString(options?.paddingChar)
      ? options.paddingChar.charAt(0)
      : "0";
    this.#minPaddedLength = _T.isNonNegativeSafeInt(options?.minPaddedLength)
      ? options.minPaddedLength
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
}

export namespace ByteFormat {
  export type Options = _FormatOptions;
}
