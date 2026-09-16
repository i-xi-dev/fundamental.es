import { _computeMd5 } from "./_md5.mts";
import { type DigestAlgorithm } from "./digest_algorithm.mts";
import { TypeAlias } from "../type/mod.mts";

export { type DigestAlgorithm };

/** @deprecated */
export const Md5: DigestAlgorithm = {
  compute: _computeMd5,
};

/** @deprecated */
export const Sha1: DigestAlgorithm = {
  /** @deprecated */
  async compute(input: TypeAlias.Bytes): Promise<TypeAlias.Bytes> {
    const buffer = await globalThis.crypto.subtle.digest("SHA-1", input);
    return new Uint8Array(buffer);
  },
};

export const Sha256: DigestAlgorithm = {
  async compute(input: TypeAlias.Bytes): Promise<TypeAlias.Bytes> {
    const buffer = await globalThis.crypto.subtle.digest("SHA-256", input);
    return new Uint8Array(buffer);
  },
};

export const Sha384: DigestAlgorithm = {
  async compute(input: TypeAlias.Bytes): Promise<TypeAlias.Bytes> {
    const buffer = await globalThis.crypto.subtle.digest("SHA-384", input);
    return new Uint8Array(buffer);
  },
};

export const Sha512: DigestAlgorithm = {
  async compute(input: TypeAlias.Bytes): Promise<TypeAlias.Bytes> {
    const buffer = await globalThis.crypto.subtle.digest("SHA-512", input);
    return new Uint8Array(buffer);
  },
};
