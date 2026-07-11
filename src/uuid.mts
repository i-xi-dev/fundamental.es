import { _T } from "./_common/mod.mts";
import { BigUint128, Uint8 } from "./numerics/mod.mts";
import { ByteOrder } from "./byte_order.mts";

export type _ToStringOptions = {
  asUrn?: boolean;
};

export interface Uuid {
  get variant(): _T.uint4;
  get version(): _T.uint4;
  get timestamp(): _T.safeint | null;
  toString(options?: _ToStringOptions): string;
  // toBigUint128(): _T.biguint128;
  // toBytes(): _T.Bytes;
  //TODO equals(other: Uuid | _T.Bytes | string): boolean;
}

const _BYTES_SIZE = 16;

function _parseBytes(bytes: _T.Bytes): {
  variant: _T.uint4;
  version: _T.uint4;
  timestamp: _T.safeint | null;
} {
  const variant = ((bytes[8] as _T.uint8) >> 4) as _T.uint4;
  const version = ((bytes[6] as _T.uint8) >> 4) as _T.uint4;

  let timestamp: _T.safeint | null = null;
  if ([0x8, 0x9, 0xA, 0xB].includes(variant) && (version === 7)) {
    let work = (new DataView(bytes.buffer)).getBigUint64(0);
    work = work >> 16n;
    timestamp = Number(work);
  }

  return { variant, version, timestamp };
}

class _Uuid implements Uuid {
  readonly #bytes: _T.Bytes; // 16バイトかつ（バリアントが8,9,A,B or Nil UUID or MAX UUID）
  readonly #type: _T.uint4;
  readonly #subtype: _T.uint4;
  readonly #timestamp: _T.safeint | null; // v7専用

  constructor(bytes: _T.Bytes) {
    this.#bytes = bytes;
    const { variant, version, timestamp } = _parseBytes(bytes);

    this.#type = variant;
    this.#subtype = version;
    this.#timestamp = timestamp;
  }

  get variant(): _T.uint4 {
    return this.#type;
  }

  get version(): _T.uint4 {
    return this.#subtype;
  }

  get timestamp(): _T.safeint | null {
    return this.#timestamp;
  }

  toString(options?: _ToStringOptions): string {
    // [0..4]-[4..6]-[6..8]-[8..9]-[9..10]-[10..]
    const str = [
      this.#bytes.slice(0, 4).toHex(),
      this.#bytes.slice(4, 6).toHex(),
      this.#bytes.slice(6, 8).toHex(),
      this.#bytes.slice(8, 10).toHex(),
      this.#bytes.slice(10).toHex(),
    ].join("-");

    return (options?.asUrn === true) ? `urn:uuid:${str}` : str;
  }

  // toBigUint128(): _T.biguint128 {
  //   return BigInt(`0x${this.#bytes.toHex()}`);
  // }
}

function _generateRandom(): _T.Bytes {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(_BYTES_SIZE));

  // 7バイト目の上位4ビットは0100₂固定（13桁目の文字列表現は"4"固定）
  bytes[6] = (bytes[6] as _T.uint8) & 0x0F | 0x40;

  // 9バイト目の上位2ビットは10₂固定（17桁目の文字列表現は"8","9","A","B"のどれか）
  bytes[8] = (bytes[8] as _T.uint8) & 0x3F | 0x80;

  return bytes;
}

function _timestamp(): _T.safeint {
  const { performance } = globalThis;
  return Math.trunc(performance.timeOrigin + performance.now());
}

const _v7Counter = (function* () {
  let last: _T.safeint = Number.MIN_SAFE_INTEGER;
  let cnt: _T.safeint = 0;
  while (true) {
    const curr = _timestamp();
    if (last < curr) {
      last = curr;
      cnt = 0;
    } else { // if (last === curr) { // last > currはありえない
      cnt += 1;
    }

    yield {
      timestamp: last,
      counter: cnt,
    };
  }
})();

function _generateUnixTimeBased(): _T.Bytes {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(_BYTES_SIZE));

  const { timestamp, counter } = _v7Counter.next().value;

  // 先頭48ビットにミリ秒精度の現在時刻をビッグエンディアンでセット
  const tsBuffer = new ArrayBuffer(8);
  const tsView = new DataView(tsBuffer);
  tsView.setBigUint64(0, BigInt(timestamp));
  bytes.set(new Uint8Array(tsBuffer, 2), 0);

  // 次の12ビットはミリ秒未満ナノ秒までをセットすることもできるが、
  // ミリ秒未満をブラウザで確実に取る方法が結局のところ無いので、（performance.～は100マイクロ秒まで精度落とされる）
  // RFC9562の6.2のMethod 1で実装する
  tsView.setBigUint64(0, 0n);
  tsView.setUint16(0, counter);
  bytes.set(new Uint8Array(tsBuffer, 0, 2), 6);

  // 7バイト目の上位4ビットは0111₂固定（13桁目の文字列表現は"7"固定）
  bytes[6] = (bytes[6] as _T.uint8) & 0x0F | 0x70;

  // 9バイト目の上位2ビットは10₂固定（17桁目の文字列表現は"8","9","A","B"のどれか）
  bytes[8] = (bytes[8] as _T.uint8) & 0x3F | 0x80;

  return bytes;
}

const _uuidRegex =
  /^(?:(?:urn:uuid:)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

function _isUuidString(test: unknown): test is string {
  return _T.isString(test) && _uuidRegex.test(test);
}

function _isUuidBigInt(test: unknown): test is _T.biguint128 {
  return _T.isBigInt(test) && (test >= BigUint128.MIN_VALUE) &&
    (test <= BigUint128.MAX_VALUE);
}

function _isUuidBytes(test: unknown): test is _T.Bytes {
  return _T.isNonSharedUint8Array(test) && (test.byteLength === _BYTES_SIZE);
}

export namespace Uuid {
  export type ToStringOptions = _ToStringOptions;

  export function nil(): Uuid {
    const bytes = new Uint8Array(_BYTES_SIZE);
    return new _Uuid(bytes);
  }

  export function max(): Uuid {
    const bytes = new Uint8Array(_BYTES_SIZE);
    bytes.fill(Uint8.MAX_VALUE);
    return new _Uuid(bytes);
  }

  /** @deprecated Use `crypto.randomUUID`. */
  export function v4(): Uuid {
    const bytes = _generateRandom();
    return new _Uuid(bytes);
  }

  export function v7(): Uuid {
    const bytes = _generateUnixTimeBased();
    return new _Uuid(bytes);
  }

  export function fromString(str: string): Uuid {
    if (_isUuidString(str) !== true) {
      throw new TypeError("Input must be an UUID of type `string`");
    }

    const hex = str.replace(/^urn:uuid:/, "").replace(/-/g, "");
    const bytes = Uint8Array.fromHex(hex);
    return new _Uuid(bytes);
  }

  export function fromBigUint128(uint: _T.biguint128): Uuid {
    if (_isUuidBigInt(uint) !== true) {
      throw new TypeError("Input must be an UUID of type `bigint`");
    }

    const bytes = BigUint128.toBytes(uint, ByteOrder.BIG_ENDIAN);
    return new _Uuid(bytes);
  }

  export function fromBytes(bytes: _T.Bytes): Uuid {
    if (_isUuidBytes(bytes) !== true) {
      throw new TypeError("TODO ");
    }

    return new _Uuid(bytes);
  }
}

// const _nameBasedVersions = new Map<DigestAlgorithm, Type.safeint>([
//   [Md5, 3],
//   [Sha1, 5],
// ]);
//
// async function _generateNameBased(
//   namespaceUuid: Uint8Array<ArrayBuffer>,
//   name: string,
//   digestAlgorithm: DigestAlgorithm, // v3はMD5、v5はSha1、それ以外は不可
// ): Promise<Uint8Array<ArrayBuffer>> {
//   const nameBytes = Text.toBytes(name);
//
//   const bytes = new Uint8Array(namespaceUuid.length + nameBytes.length);
//   bytes.set(namespaceUuid, 0);
//   bytes.set(nameBytes, namespaceUuid.length);
//
//   const version = _nameBasedVersions.get(digestAlgorithm)!;
//   const digestBytes = new Uint8Array(await digestAlgorithm.compute(bytes));
//
//   if (version === 5) {
//     // 7バイト目の上位4ビットは0101₂固定（13桁目の文字列表現は"5"固定）
//     digestBytes[6] = (digestBytes[6] as Type.uint8) & 0x0F | 0x50;
//   } else { // if (version === 3) {
//     // 7バイト目の上位4ビットは0011₂固定（13桁目の文字列表現は"3"固定）
//     digestBytes[6] = (digestBytes[6] as Type.uint8) & 0x0F | 0x30;
//   }
//
//   // 9バイト目の上位2ビットは10₂固定（17桁目の文字列表現は"8","9","A","B"のどれか）
//   digestBytes[8] = (digestBytes[8] as Type.uint8) & 0x3F | 0x80;
//
//   // 17バイト目以降は破棄
//   return digestBytes.slice(0, 16);
// }
