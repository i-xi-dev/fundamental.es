import type {
  _char16,
  _char32,
  _codepoint,
} from "../_/_type_alias/_def/_defs.mts";
import type {
  _safeint,
  _uint16,
} from "../../numerics/_/_type_alias/_def/_defs.mts";
import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import { _assertString } from "../../_/_type/_string.mts";
import { _assertWellFormedString } from "../_/_type_ext/_well_formed_string.mts";
import { _TextualException } from "../_internal/error/mod.mts";
import { _Utf8 } from "../../_internal/_utf8/mod.mts";
import { _utf8Encode } from "../_utf_8/_func.mts";

export {
  _assertNonEmptyString as assertNonEmpty,
  _isNonEmptyString as isNonEmpty,
} from "../_/_type_ext/_non_empty_string.mts";

export {
  _isWellFormedString as isWellFormed,
} from "../_/_type_ext/_well_formed_string.mts";

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
  return _Utf8.decode(bytes, options?.allowMalformed !== true, false);
}

//TODO fromBytesAsyncIterable

export function toBytes(text: string, options?: Options): TypeAlias.Bytes {
  return _utf8Encode(text, options?.allowMalformed !== true);
}

//TODO from/toBase64

type _char16s = IterableIterator<_char16, void, void>;

// export function fromChar16Iterable(chars: Iterable<_char16>): string {
// }

//XXX fromChar16AsyncIterable

export function toChar16Iterable(text: string, options?: Options): _char16s {
  _assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  return (function* (s: string) {
    for (let i = 0; i < s.length; i++) {
      yield s.at(i)!;
    }
  })(text);
}

//XXX fromUint16Iterable
//XXX fromUint16AsyncIterable

export function toUint16Iterable(
  text: string,
  options?: Options,
): IterableIterator<_uint16, void, void> {
  _assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  // return toChar16s(text).map((c) => c.codePointAt(0) as _codepoint); //XXX Iterator#map()がまだ使えない
  return (function* (s: string) {
    for (let i = 0; i < s.length; i++) {
      yield s.charCodeAt(i);
    }
  })(text);
}

type _char32s = IterableIterator<_char32, void, void>;

// export function fromChar32Iterable(chars: Iterable<_char32>): string {
// }

//XXX fromChar32AsyncIterable

export function toChar32Iterable(text: string, options?: Options): _char32s {
  _assertString(text, "Input");
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
): IterableIterator<_codepoint, void, void> {
  _assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  // return toChar32s(text).map((c) => c.codePointAt(0) as _codepoint);
  return (function* (s: string) {
    for (const i of s) {
      yield i.codePointAt(0) as _codepoint;
    }
  })(text);
}

//TODO toGraphemeIterable

export function char16CountOf(text: string, options?: Options): _safeint {
  _assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  return text.length;
}

export function char32CountOf(text: string, options?: Options): _safeint {
  _assertString(text, "Input");
  if (options?.allowMalformed !== true) {
    _assertWellFormedString(text, "Input");
  }

  return [...text].length;
}
