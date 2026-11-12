import type {
  _char16,
  _char32,
  _codepoint,
} from "./_/_type_alias/_def/_defs.mts";
import { _assertCodePoint } from "./_/_type_alias/_code_point.mts";
import { CodePoint } from "./code_point/mod.mts";

export type RuneInfo = {
  codePoint: _codepoint;
  char32: _char32;
  char16s: [_char16, _char16] | [_char16];
};

type _FromOptions = {
  allowLoneSurrogate?: boolean;
};

export namespace RuneInfo {
  export type FromOptions = _FromOptions;

  export function fromCodePoint(
    codePoint: _codepoint,
    options?: _FromOptions,
  ): RuneInfo {
    _assertCodePoint(codePoint, "Input");

    if (options?.allowLoneSurrogate !== true) {
      if (CodePoint.isSurrogate(codePoint) === true) {
        throw new Error("TODO");
      }
    }

    const char32 = String.fromCodePoint(codePoint);
    return {
      codePoint,
      char32,
      char16s: (char32.length === 1)
        ? [char32]
        : [char32.at(0)!, char32.at(1)!],
    };
  }

  // export function fromChar32(): RuneInfo {
  // }
}

//TODO

// export function inBmp(rune: _char32): boolean {
//   return Type.isString(rune) && (rune.length === 1);
// }

// const _HIGH_SURROGATE = /^[\uD800-\uDBFF]$/;

// export function isHighSurrogate(rune: _char32): boolean {
//   //TODO isString &&
//   return _HIGH_SURROGATE.test(rune);
// }

//TODO
/*
class CharSequence<T extends string> implements ... {
  static fromChar8Iterable(): CharSequence<_char8> {
  }
  static fromChar16Iterable(): CharSequence<_char16> {
  }
  static fromChar32Iterable(): CharSequence<_char32> {
  }

  条件に合致するところまですすめる() "abc"が出現するところまで(abcを含む|含まない)とか
  条件に従って配列or新たなIterator化() 3文字ずつとか、","で区切るとか
}
*/
