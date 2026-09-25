import { _Assert, _Error, _U } from "../../_common/mod.mts";
import { ByteFormat } from "../../byte_format.mts";
import { Radix, Uint8 } from "../../numerics/mod.mts";
import { CodePoint, Rune, Text } from "../../textual/mod.mts";
import { Type, TypeAlias } from "../../type/mod.mts";

export type _PercentOptions = {
  encodeSet?: Array</* Type.uint8 */ number>;
  spaceAsPlus?: boolean;
};

function* _defaultEncodeSet() {
  for (let i = 0; i <= Uint8.MAX_VALUE; i++) {
    yield i as Type.uint8;
  }
}

export namespace _PercentOptions {
  export function resolve(
    options?: _PercentOptions,
  ): Required<_PercentOptions> {
    const set: Set<Type.uint8> = new Set();

    if (Array.isArray(options?.encodeSet) === true) {
      for (const b of options.encodeSet) {
        if (Type.isUint8(b) === true) {
          set.add(b);
        }
      }
    }

    const encodeSet = (set.size <= 0) ? [..._defaultEncodeSet()] : [...set];
    return {
      encodeSet,
      spaceAsPlus: (options?.spaceAsPlus === true) &&
        encodeSet.includes(CodePoint.PLUS_SIGN),
    };
  }
}

const _regex = /^[\u0020-\u007E]*$/; //XXX 共通assertにする

export function _decode(
  text: string,
  options: Required<_PercentOptions>,
): TypeAlias.Bytes {
  Type.Assert.string(text, "Input");
  if (_regex.test(text) !== true) {
    throw _Error.Syntax.mustBePercentEncoded("Input");
  }

  const decoded = new Uint8Array(text.length); // 0x20-0x7E以外を含んでいたらエラーにしている為decoded.lengthがtext.lengthより増えることは無い
  const hexRegExp = /^[0-9A-Fa-f]{2}$/;

  let i = 0;
  let j = 0;
  while (i < text.length) {
    const c = text.charAt(i);

    let byte: Type.uint8;
    if (c === Rune.PERCENT_SIGN) {
      const byteString = text.substring(i + 1, i + 3);
      if (hexRegExp.test(byteString)) {
        byte = Number.parseInt(byteString, 16) as Type.uint8;
        i = i + 3;
      } else {
        byte = c.charCodeAt(0) as Type.uint8;
        i = i + 1;
      }
    } else if (c === Rune.PLUS_SIGN) {
      if (options.spaceAsPlus === true) {
        byte = CodePoint.SPACE;
      } else {
        byte = CodePoint.PLUS_SIGN; // c.charCodeAt(0) as uint8;
      }
      i = i + 1;
    } else {
      byte = c.charCodeAt(0) as Type.uint8;
      i = i + 1;
    }

    decoded[j++] = byte;
  }

  if (decoded.length > j) {
    // return decoded.subarray(0, j);
    return decoded.slice(0, j);
  }
  return decoded;
}

export function _staticDecode(
  text: string,
  options?: _PercentOptions,
): TypeAlias.Bytes {
  return _decode(text, _PercentOptions.resolve(options));
}

const f = new ByteFormat({
  minLength: 2,
  radix: Radix.HEXADECIMAL,
  upperCase: true,
});

export function _encode(
  bytes: TypeAlias.Bytes,
  options: Required<_PercentOptions>,
): string {
  _Assert.nonSharedUint8Array(bytes, "Input");

  return Array.from(bytes, (byte) => {
    if ((byte === CodePoint.SPACE) && (options.spaceAsPlus === true)) {
      return Rune.PLUS_SIGN;
    }
    if (
      (byte < CodePoint.SPACE) ||
      (byte > _U.CharCode.TILDE) ||
      (byte === CodePoint.PERCENT_SIGN) ||
      (options.encodeSet.includes(byte) === true)
    ) {
      return `${Rune.PERCENT_SIGN}${f.format(byte)}`;
    }
    return String.fromCharCode(byte);
  }).join(Text.EMPTY);
}

export function _staticEncode(
  bytes: TypeAlias.Bytes,
  options?: _PercentOptions,
): string {
  return _encode(bytes, _PercentOptions.resolve(options));
}
