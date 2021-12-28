//

import { StringUtils } from "./string_utils";
import {
  type uint8,
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
  /** 基数 */
  radix: Radix,

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
  /** @see {@link ResolvedOptions.radix} */
  radix?: Radix,

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
  // default:
  //   return -1 as never;
  }
}

function resolveOptions(options: Options | ResolvedOptions = {}): ResolvedOptions {
  const radixIsValid: boolean = isRadix(options.radix) || (options.radix === undefined);
  if (radixIsValid !== true) {
    throw new TypeError("radix");
  }
  const radix: Radix = isRadix(options.radix) ? options.radix as Radix : 16;

  const paddedLengthIsValid: boolean = Number.isSafeInteger(options.paddedLength) || (options.paddedLength === undefined);
  if (paddedLengthIsValid !== true) {
    throw new TypeError("paddedLength");
  }
  const minPaddedLength: number = minPaddedLengthOf(radix);
  const paddedLength: number = Number.isSafeInteger(options.paddedLength) ? options.paddedLength as number : minPaddedLength;
  if (paddedLength < minPaddedLength) {
    throw new RangeError("paddedLength");
  }

  const upperCaseIsValid: boolean = (typeof options.upperCase === "boolean");
  const prefixIsValid: boolean = (typeof options.prefix === "string");
  const suffixIsValid: boolean = (typeof options.suffix === "string");
  const separatorIsValid: boolean = (typeof options.separator === "string");
  const isFrozen: boolean = Object.isFrozen(options);

  if (radixIsValid && paddedLengthIsValid && upperCaseIsValid && suffixIsValid && separatorIsValid && isFrozen) {
    return options as ResolvedOptions;
  }

  const upperCase: boolean = upperCaseIsValid ? options.upperCase as boolean : true;
  const prefix: string = prefixIsValid ? options.prefix as string : "";
  const suffix: string = suffixIsValid ? options.suffix as string : "";
  const separator: string = separatorIsValid ? options.separator as string : "";

  return Object.freeze({
    radix,
    paddedLength,
    upperCase,
    prefix,
    suffix,
    separator,
  });
}

/**
 * 文字列がフォーマットオプションに合致しているか否かを返却
 * 
 * @param resolvedOptions - フォーマッターオプション
 * @returns 文字列がフォーマットオプションに合致しているか否か
 */
function createByteRegex(resolvedOptions: ResolvedOptions): RegExp {
  let charsPattern: string;
  switch (resolvedOptions.radix) {
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
  const bodyLength = minPaddedLengthOf(resolvedOptions.radix);
  const paddingLength = resolvedOptions.paddedLength - bodyLength;
  const paddingPattern = (paddingLength > 0) ? `[0]{${ paddingLength }}` : "";
  return new RegExp(`^${ paddingPattern }${ charsPattern }{${ bodyLength }}$`);
}

/**
 * 文字列を8-bit符号なし整数にパースし返却
 * 
 * @param formatted - 文字列
 * @returns 8-bit符号なし整数
 */
function parseByte(formatted: string, options: ResolvedOptions, byteRegex: RegExp): uint8 {
  let work = formatted;

  if (options.prefix.length > 0) {
    if (work.startsWith(options.prefix)) {
      work = work.substring(options.prefix.length);
    }
    else {
      throw new TypeError("unprefixed");
    }
  }

  if (options.suffix.length > 0) {
    if (work.endsWith(options.suffix)) {
      work = work.substring(0, (work.length - options.suffix.length));
    }
    else {
      throw new TypeError("unsuffixed");
    }
  }

  if (byteRegex.test(work) !== true) {
    throw new TypeError(`parse error: ${work}`);
  }

  const integer = Number.parseInt(work, options.radix);
  // if (Uint8.isUint8(integer)) {
  return integer as uint8; // regex.testがtrueならuint8のはず
  // }
  // else 
}

function parse(toParse: string, options: ResolvedOptions, byteRegex: RegExp): Uint8Array {
  let byteStringArray: string[];
  if (options.separator.length > 0) {
    byteStringArray = toParse.split(options.separator);
    if (byteStringArray.length === 1 && byteStringArray[0] === "") {
      return new Uint8Array(0);
    }
  }
  else {
    const elementLength = options.paddedLength + options.prefix.length + options.suffix.length;
    byteStringArray = StringUtils.devideByLength(toParse, elementLength);
  }

  return Uint8Array.from(byteStringArray, (byteString) => {
    return parseByte(byteString, options, byteRegex);
  });
}

/**
 * 8-bit符号なし整数を文字列にフォーマットし返却
 * 
 * @param byte 8-bit符号なし整数
 * @param radix フォーマット結果の基数
 * @param resolvedOptions フォーマッターオプション
 * @returns 文字列
 */
function formatByte(byte: uint8, options: ResolvedOptions): string {
  let str = byte.toString(options.radix);
  if (options.upperCase === true) {
    str = str.toUpperCase();
  }
  str = str.padStart(options.paddedLength, "0");
  return options.prefix + str + options.suffix;
}

function format(bytes: Uint8Array, options: ResolvedOptions): string {
  const byteStringArray = [ ...bytes ].map((byte) => {
    return formatByte(byte as uint8, options);
  });
  return byteStringArray.join(options.separator);
}

class Parser {
  static #parserCache: WeakMap<ResolvedOptions, Parser> = new WeakMap();

  /**
   * 未設定項目を埋めたオプション
   */
  #options: ResolvedOptions;

  #byteRegex: RegExp;// "g"等を持たせないよう注意

  constructor(options?: Options) {
    this.#options = resolveOptions(options);
    this.#byteRegex = createByteRegex(this.#options);
    Object.freeze(this);
  }

  parse(toParse: string): Uint8Array {
    return parse(toParse, this.#options, this.#byteRegex);
  }

  static get(options?: Options): Parser {
    const resolvedOptions = resolveOptions(options);
    if (Parser.#parserCache.has(resolvedOptions) !== true) {
      Parser.#parserCache.set(resolvedOptions, new Parser(resolvedOptions));
    }
    return Parser.#parserCache.get(resolvedOptions) as Parser;
  }
}
Object.freeze(Parser);

class Formatter {
  static #formatterCache: WeakMap<ResolvedOptions, Formatter> = new WeakMap();

  /**
   * 未設定項目を埋めたオプション
   */
  #options: ResolvedOptions;

  constructor(options?: Options) {
    this.#options = resolveOptions(options);
    Object.freeze(this);
  }

  format(bytes: Uint8Array): string {
    return format(bytes, this.#options);
  }

  static get(options?: Options): Formatter {
    const resolvedOptions = resolveOptions(options);
    if (Formatter.#formatterCache.has(resolvedOptions) !== true) {
      Formatter.#formatterCache.set(resolvedOptions, new Formatter(resolvedOptions));
    }
    return Formatter.#formatterCache.get(resolvedOptions) as Formatter;
  }
}
Object.freeze(Formatter);

const ByteFormat = Object.freeze({
  parse(toParse: string, options?: Options): Uint8Array {
    const resolvedOptions = resolveOptions(options);
    const byteRegex = createByteRegex(resolvedOptions);
    return parse(toParse, resolvedOptions, byteRegex);
  },

  format(bytes: Uint8Array, options?: Options): string {
    const resolvedOptions = resolveOptions(options);
    return format(bytes, resolvedOptions);
  },

  resolveOptions,
});

export {
  type Radix as ByteFormatRadix,
  type Options as ByteFormatOptions,
  Parser as BytesParser,
  Formatter as BytesFormatter,
  ByteFormat,
};
