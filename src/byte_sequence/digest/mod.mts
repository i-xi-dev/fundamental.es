import { _computeMd5 } from "./md5.mts";
import { _T } from "../../_common/mod.mts";
import { type DigestAlgorithm } from "./digest_algorithm.mts";

export { type DigestAlgorithm };

/** @deprecated */
export const Md5: DigestAlgorithm = {
  compute: _computeMd5,
};

/** @deprecated */
export const Sha1: DigestAlgorithm = {
  /** @deprecated */
  async compute(input: _T.Bytes): Promise<_T.Bytes> {
    const buffer = await globalThis.crypto.subtle.digest("SHA-1", input);
    return new Uint8Array(buffer);
  },
};

export const Sha256: DigestAlgorithm = {
  async compute(input: _T.Bytes): Promise<_T.Bytes> {
    const buffer = await globalThis.crypto.subtle.digest("SHA-256", input);
    return new Uint8Array(buffer);
  },
};

export const Sha384: DigestAlgorithm = {
  async compute(input: _T.Bytes): Promise<_T.Bytes> {
    const buffer = await globalThis.crypto.subtle.digest("SHA-384", input);
    return new Uint8Array(buffer);
  },
};

export const Sha512: DigestAlgorithm = {
  async compute(input: _T.Bytes): Promise<_T.Bytes> {
    const buffer = await globalThis.crypto.subtle.digest("SHA-512", input);
    return new Uint8Array(buffer);
  },
};
