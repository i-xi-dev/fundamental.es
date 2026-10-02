import * as _Utf8 from "../text_encoding/_utf8/mod.mts";
import { Type, TypeAlias } from "../../type/mod.mts";

export const EMPTY = "";

type _FromBytesOptions = {
  allowMalformed?: boolean;
  //XXX ignoreBom
};

export function fromBytes(
  bytes: TypeAlias.Bytes,
  options?: _FromBytesOptions,
): string {
  return _Utf8.decode(bytes, {
    fatal: options?.allowMalformed !== true,
    ignoreBom: false,
  });
}

//TODO fromBytesAsyncIterable

type _ToBytesOptions = {
  allowMalformed?: boolean;
};

export function toBytes(
  text: string,
  options?: _ToBytesOptions,
): TypeAlias.Bytes {
  return _Utf8.encode(text, {
    fatal: options?.allowMalformed !== true,
  });
}

type _char16s = IterableIterator<TypeAlias.char16, void, void>;

// export function fromChar16Iterable(chars: Iterable<TypeAlias.char16>): string {
// }

//XXX fromChar16AsyncIterable

//XXX allowMalformed
export function toChar16Iterable(text: string): _char16s {
  Type.Assert.string(text, "Input");

  return (function* (s: string) {
    for (let i = 0; i < s.length; i++) {
      yield s.charAt(i);
    }
  })(text);
}

//XXX fromCharCodeIterable
//XXX fromCharCodeAsyncIterable

export function toCharCodeIterable(
  text: string,
): IterableIterator<TypeAlias.codepoint, void, void> {
  Type.Assert.string(text, "Input");

  // return toChar16s(text).map((c) => c.codePointAt(0) as TypeAlias.codepoint);
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

//XXX allowMalformed
export function toChar32Iterable(text: string): _char32s {
  Type.Assert.string(text, "Input");

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
): IterableIterator<TypeAlias.codepoint, void, void> {
  Type.Assert.string(text, "Input");

  // return toChar32s(text).map((c) => c.codePointAt(0) as TypeAlias.codepoint);
  return (function* (s: string) {
    for (const i of s) {
      yield i.codePointAt(0) as TypeAlias.codepoint;
    }
  })(text);
}

//TODO toGraphemeIterable
