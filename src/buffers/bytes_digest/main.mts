import type { DigestAlgorithm } from "./digest_algorithm.mts";
import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import { _computeMd5 } from "./_md5.mts";

export { type DigestAlgorithm as Algorithm };

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
