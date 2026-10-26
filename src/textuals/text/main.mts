import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import {
  _assertNonEmptyString,
  _assertWellFormedString,
  _isNonEmptyString,
  _isWellFormedString,
} from "../_internal/common.mts";
import { _TextualException } from "../_internal/error/mod.mts";
import { Type } from "../../type/mod.mts";
import { Utf8 } from "../../_internal/utf8/mod.mts";

export { _isNonEmptyString as isNonEmpty };

export { _assertNonEmptyString as assertNonEmpty };

export { _isWellFormedString as isWellFormed };

export { _assertWellFormedString as assertWellFormed };

export const EMPTY = "";

export type Options = {
  allowMalformed?: boolean;
};

// export type FromBytesOptions = _Options & {
//   //XXX ignoreBom
// };
export type FromBytesOptions = Options;

export function fromBytes(
  bytes: TypeAlias.Bytes,
  options?: FromBytesOptions,
): string {
  //TODO assert bytes
  return Utf8.decode(bytes, options?.allowMalformed !== true, false);
}

//TODO fromBytesAsyncIterable

export function toBytes(text: string, options?: Options): TypeAlias.Bytes {
  return Utf8.encode(text, options?.allowMalformed !== true);
}

//TODO from/toBase64

type _char16s = IterableIterator<TypeAlias.char16, void, void>;

// export function fromChar16Iterable(chars: Iterable<TypeAlias.char16>): string {
// }

//XXX fromChar16AsyncIterable

export function toChar16Iterable(text: string, options?: Options): _char16s {
  Type.assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  return (function* (s: string) {
    for (let i = 0; i < s.length; i++) {
      yield s.charAt(i);
    }
  })(text);
}

//XXX fromCharCodeIterable
//XXX fromCharCodeAsyncIterable

//XXX 命名これで良い？
export function toCharCodeIterable(
  text: string,
  options?: Options,
): IterableIterator<TypeAlias.codepoint & TypeAlias.uint16, void, void> {
  Type.assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  // return toChar16s(text).map((c) => c.codePointAt(0) as TypeAlias.codepoint); //XXX Iterator#map()がまだ使えない
  return (function* (s: string) {
    for (let i = 0; i < s.length; i++) {
      yield s.charCodeAt(i);
    }
  })(text);
}

type _char32s = IterableIterator<TypeAlias.char32, void, void>;

// export function fromChar32Iterable(chars: Iterable<TypeAlias.char32>): string {
// }

//XXX fromChar32AsyncIterable

export function toChar32Iterable(text: string, options?: Options): _char32s {
  Type.assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  return text[Symbol.iterator]();
  // return (function* (s: string) {
  //   for (const i of s) {
  //     yield i;
  //   }
  // })(text);
}

//XXX fromCodePointIterable
//XXX fromCodePointAsyncIterable

export function toCodePointIterable(
  text: string,
  options?: Options,
): IterableIterator<TypeAlias.codepoint, void, void> {
  Type.assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  // return toChar32s(text).map((c) => c.codePointAt(0) as TypeAlias.codepoint);
  return (function* (s: string) {
    for (const i of s) {
      yield i.codePointAt(0) as TypeAlias.codepoint;
    }
  })(text);
}

//TODO toGraphemeIterable

export function char16CountOf(
  text: string,
  options?: Options,
): TypeAlias.safeint {
  Type.assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  return text.length;
}

export function char32CountOf(
  text: string,
  options?: Options,
): TypeAlias.safeint {
  Type.assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  return [...text].length;
}
