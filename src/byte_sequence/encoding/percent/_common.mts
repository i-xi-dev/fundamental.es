import {
  _Assert,
  _Error,
  _Type,
  _U,
  StringUtils,
} from "../../../_common/mod.mts";
import { ByteFormat } from "../../../byte_format.mts";
import { Radix, Uint8 } from "../../../numerics/mod.mts";

const { EMPTY } = StringUtils;

export type _PercentOptions = {
  encodeSet?: Array</* _Type.uint8 */ number>;
  spaceAsPlus?: boolean;
};

function* _defaultEncodeSet() {
  for (let i = 0; i <= Uint8.MAX_VALUE; i++) {
    yield i as _Type.uint8;
  }
}

export namespace _PercentOptions {
  export function resolve(
    options?: _PercentOptions,
  ): Required<_PercentOptions> {
    const set: Set<_Type.uint8> = new Set();

    if (Array.isArray(options?.encodeSet) === true) {
      for (const b of options.encodeSet) {
        if (_Type.isUint8(b) === true) {
          set.add(b);
        }
      }
    }

    const encodeSet = (set.size <= 0) ? [..._defaultEncodeSet()] : [...set];
    return {
      encodeSet,
      spaceAsPlus: (options?.spaceAsPlus === true) &&
        encodeSet.includes(_U.CharCode.PLUS_SIGN),
    };
  }
}

const _regex = /^[\u0020-\u007E]*$/; //XXX 共通assertにする

export function _decode(
  text: string,
  options: Required<_PercentOptions>,
): _Type.Bytes {
  _Assert.string(text, "Input");
  if (_regex.test(text) !== true) {
    throw _Error.Syntax.asciiWithoutCc("Input");
  }

  const decoded = new Uint8Array(text.length); // 0x20-0x7E以外を含んでいたらエラーにしている為decoded.lengthがtext.lengthより増えることは無い
  const hexRegExp = /^[0-9A-Fa-f]{2}$/;

  let i = 0;
  let j = 0;
  while (i < text.length) {
    const c = text.charAt(i);

    let byte: _Type.uint8;
    if (c === _U.Char.PERCENT_SIGN) {
      const byteString = text.substring(i + 1, i + 3);
      if (hexRegExp.test(byteString)) {
        byte = Number.parseInt(byteString, 16) as _Type.uint8;
        i = i + 3;
      } else {
        byte = c.charCodeAt(0) as _Type.uint8;
        i = i + 1;
      }
    } else if (c === _U.Char.PLUS_SIGN) {
      if (options.spaceAsPlus === true) {
        byte = _U.CharCode.SPACE;
      } else {
        byte = _U.CharCode.PLUS_SIGN; // c.charCodeAt(0) as uint8;
      }
      i = i + 1;
    } else {
      byte = c.charCodeAt(0) as _Type.uint8;
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
): _Type.Bytes {
  return _decode(text, _PercentOptions.resolve(options));
}

const f = new ByteFormat({
  minLength: 2,
  radix: Radix.HEXADECIMAL,
  upperCase: true,
});

export function _encode(
  bytes: _Type.Bytes,
  options: Required<_PercentOptions>,
): string {
  _Assert.nonSharedUint8Array(bytes, "Input");

  return Array.from(bytes, (byte) => {
    if ((byte === _U.CharCode.SPACE) && (options.spaceAsPlus === true)) {
      return _U.Char.PLUS_SIGN;
    }
    if (
      (byte < _U.CharCode.SPACE) ||
      (byte > _U.CharCode.TILDE) ||
      (byte === _U.CharCode.PERCENT_SIGN) ||
      (options.encodeSet.includes(byte) === true)
    ) {
      return `${_U.Char.PERCENT_SIGN}${f.format(byte)}`;
    }
    return String.fromCharCode(byte);
  }).join(EMPTY);
}

export function _staticEncode(
  bytes: _Type.Bytes,
  options?: _PercentOptions,
): string {
  return _encode(bytes, _PercentOptions.resolve(options));
}
