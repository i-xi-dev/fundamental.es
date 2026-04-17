import { _Message, _T, _U } from "../../_common/mod.mts";

export type _PercentOptions = {
  encodeSet?: Array<number>; // Array<uint8>;
  spaceAsPlus?: boolean;
};

function* _defaultEncodeSet() {
  for (let i = 0; i <= 0xFF /*TODO Uint8.MAX */; i++) {
    yield i as _T.uint8;
  }
}

export namespace _PercentOptions {
  export function resolve(
    options?: _PercentOptions,
  ): Required<_PercentOptions> {
    const set: Set<_T.uint8> = new Set();

    if (Array.isArray(options?.encodeSet) === true) {
      for (const b of options.encodeSet) {
        if (_T.isUint8(b) === true) {
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

const _regex = /^[\u0020-\u007E]*$/;

export function _decode(
  text: string,
  options: Required<_PercentOptions>,
): _T.Bytes {
  if (_T.isString(text) !== true) {
    throw new TypeError(_Message.build("E10001"));
  }
  if (_regex.test(text) !== true) {
    throw new SyntaxError(_Message.build("E10010"));
  }

  const decoded = new Uint8Array(text.length); // 0x20-0x7E以外を含んでいたらエラーにしている為decoded.lengthがtext.lengthより増えることは無い
  const hexRegExp = /^[0-9A-Fa-f]{2}$/;

  let i = 0;
  let j = 0;
  while (i < text.length) {
    const c = text.charAt(i);

    let byte: _T.uint8;
    if (c === _U.Char.PERCENT_SIGN) {
      const byteString = text.substring(i + 1, i + 3);
      if (hexRegExp.test(byteString)) {
        byte = Number.parseInt(byteString, 16) as _T.uint8;
        i = i + 3;
      } else {
        byte = c.charCodeAt(0) as _T.uint8;
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
      byte = c.charCodeAt(0) as _T.uint8;
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
): _T.Bytes {
  return _decode(text, _PercentOptions.resolve(options));
}

//TODO 外に出す
function _byte_to_hex(byte: _T.uint8): string {
  return byte.toString(16).padStart(2, _U.Char.DIGIT_ZERO);
}

export function _encode(
  bytes: _T.Bytes,
  options: Required<_PercentOptions>,
): string {
  if (_T.isNonSharedUint8Array(bytes) !== true) {
    throw new TypeError(_Message.build("E10002"));
  }

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
      return `${_U.Char.PERCENT_SIGN}${
        _byte_to_hex(byte as _T.uint8).toUpperCase()
      }`;
    }
    return String.fromCharCode(byte);
  }).join("");
}

export function _staticEncode(
  bytes: _T.Bytes,
  options?: _PercentOptions,
): string {
  return _encode(bytes, _PercentOptions.resolve(options));
}
