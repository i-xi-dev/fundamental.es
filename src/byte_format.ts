//

import { StringUtils } from "./string_utils";
import {
  uint8,
  // Uint8,
} from "./uint8";

/**
 * フォーマッターで対応する基数
 */
type Radix = 2 | 8 | 10 | 16;

function isRadix(value: unknown): value is Radix {
  if (typeof value === "number") {
    return [ 2, 8, 10, 16 ].includes(value);
  }
  return false;
}
 
/**
 * オプション
 */
type ResolvedOptions = {
  /** 前方埋め結果の文字列長 */
  paddedLength: number,

  /** 16進数のa-fを大文字にするか否か */
  upperCase: boolean,

  /** 各バイトのプレフィックス */
  prefix: string,

  /** 各バイトのサフィックス */
  suffix: string,

  /** 各バイトの連結子 */
  separator: string,
};

/**
 * オプション
 * 未設定を許可
 */
type Options = {
  /** @see {@link ResolvedOptions.paddedLength} */
  paddedLength?: number,

  /** @see {@link ResolvedOptions.upperCase} */
  upperCase?: boolean,

  /** @see {@link ResolvedOptions.prefix} */
  prefix?: string,

  /** @see {@link ResolvedOptions.suffix} */
  suffix?: string,

  /** @see {@link ResolvedOptions.separator} */
  separator?: string,
};

/**
 * 基数に応じた前方ゼロ埋め結果の最小文字列長を返却
 * 
 * @returns フォーマット結果の前方ゼロ埋め結果の最小文字列長
 */
function minPaddedLengthOf(radix: Radix): number {
  switch (radix) {
  case 2:
    return 8;
  case 8:
    return 3;
  case 10:
    return 3;
  case 16:
    return 2;
  default:
    return -1;
  }
}

function resolveOptions(radix: Radix, options: Options | ResolvedOptions = {}): ResolvedOptions {
  const minPaddedLength: number = minPaddedLengthOf(radix);
  const paddedLength: number = (typeof options.paddedLength === "number") ? options.paddedLength : minPaddedLength;
  if (Number.isSafeInteger(paddedLength) !== true) {
    throw new TypeError("paddedLength");
  }
  if (paddedLength < minPaddedLength) {
    throw new RangeError("paddedLength");
  }

  const upperCase: boolean = (typeof options.upperCase === "boolean") ? options.upperCase : true;
  const prefix: string = (typeof options.prefix === "string") ? options.prefix : "";
  const suffix: string = (typeof options.suffix === "string") ? options.suffix : "";
  const separator: string = (typeof options.separator === "string") ? options.separator : "";

  return {
    paddedLength,
    upperCase,
    prefix,
    suffix,
    separator,
  };
}

/**
 * 文字列がフォーマットオプションに合致しているか否かを返却
 * 
 * @param radix - フォーマット結果の基数
 * @param resolvedOptions - フォーマッターオプション
 * @returns 文字列がフォーマットオプションに合致しているか否か
 */
function createByteRegex(radix: Radix, resolvedOptions: ResolvedOptions): RegExp {
  let charsPattern: string;
  switch (radix) {
  case 2:
    charsPattern = "[01]";
    break;
  case 8:
    charsPattern = "[0-7]";
    break;
  case 10:
    charsPattern = "[0-9]";
    break;
  case 16:
    charsPattern = "[0-9A-Fa-f]";
    break;
  }
  const bodyLength = minPaddedLengthOf(radix);
  const paddingLength = resolvedOptions.paddedLength - bodyLength;
  const paddingPattern = (paddingLength > 0) ? `[0]{${ paddingLength }}` : "";
  return new RegExp(`^${ paddingPattern }${ charsPattern }{${ bodyLength }}$`);
}

class ByteFormat {
  #radix: Radix;

  /**
   * 未設定項目を埋めたオプション
   */
  #options: ResolvedOptions;

  #byteRegex: RegExp;// "g"等を持たせないよう注意

  constructor(radix: Radix = 16, options?: Options) {
    if (isRadix(radix) !== true) {
      throw new TypeError("invalid radix");
    }
    this.#radix = radix;
    this.#options = resolveOptions(this.#radix, options);
    this.#byteRegex = createByteRegex(this.#radix, this.#options);
    Object.freeze(this);
  }

  parse(toParse: string): Uint8Array {
    let byteStringArray: string[];
    if (this.#options.separator.length > 0) {
      byteStringArray = toParse.split(this.#options.separator);
      if (byteStringArray.length === 1 && byteStringArray[0] === "") {
        return new Uint8Array(0);
      }
    }
    else {
      const elementLength = this.#options.paddedLength + this.#options.prefix.length + this.#options.suffix.length;
      byteStringArray = StringUtils.devideByLength(toParse, elementLength);
    }

    return Uint8Array.from(byteStringArray, (byteString) => {
      return this.#parseByte(byteString);
    });
  }

  format(bytes: Uint8Array): string {
    const byteStringArray = [ ...bytes ].map((byte) => {
      return this.#formatByte(byte as uint8);
    });
    return byteStringArray.join(this.#options.separator);
  }

  /**
   * 文字列を8-bit符号なし整数にパースし返却
   * 
   * @param formatted - 文字列
   * @returns 8-bit符号なし整数
   */
  #parseByte(formatted: string): uint8 {
    let work = formatted;

    if (this.#options.prefix.length > 0) {
      if (work.startsWith(this.#options.prefix)) {
        work = work.substring(this.#options.prefix.length);
      }
      else {
        throw new TypeError("unprefixed");
      }
    }

    if (this.#options.suffix.length > 0) {
      if (work.endsWith(this.#options.suffix)) {
        work = work.substring(0, (work.length - this.#options.suffix.length));
      }
      else {
        throw new TypeError("unsuffixed");
      }
    }

    if (this.#byteRegex.test(work) !== true) {
      throw new TypeError(`parse error: ${work}`);
    }

    const integer = Number.parseInt(work, this.#radix);
    // if (Uint8.isUint8(integer)) {
    return integer as uint8; // regex.testがtrueならuint8のはず
    // }
    // else 
  }

  /**
   * 8-bit符号なし整数を文字列にフォーマットし返却
   * 
   * @param byte 8-bit符号なし整数
   * @param radix フォーマット結果の基数
   * @param resolvedOptions フォーマッターオプション
   * @returns 文字列
   */
  #formatByte(byte: uint8): string {
    let str = byte.toString(this.#radix);
    if (this.#options.upperCase === true) {
      str = str.toUpperCase();
    }
    str = str.padStart(this.#options.paddedLength, "0");
    return this.#options.prefix + str + this.#options.suffix;
  }
}
Object.freeze(ByteFormat);

export type {
  Radix as ByteFormatRadix,
  Options as ByteFormatOptions,
};

export { ByteFormat };
