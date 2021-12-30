//

/**
 * Digest algorithm
 */
interface DigestAlgorithm {
  /**
   * Computes the digest for the byte sequence.
   * 
   * @param input - The input to compute the digest.
   * @returns The {@link [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)} that
   *     fulfills with a computed digest.
   */
  compute: (input: Uint8Array) => Promise<Uint8Array>;
}

/**
 * SHA-256 digest algorithm
 */
const Sha256: DigestAlgorithm = Object.freeze({
  /**
   * Computes the SHA-256 digest for the byte sequence.
   * 
   * @see {@link DigestAlgorithm.compute}
   */
  async compute(input: Uint8Array): Promise<Uint8Array> {
    const bytes = await globalThis.crypto.subtle.digest("SHA-256", input);
    return new Uint8Array(bytes);
  },
});

/**
 * SHA-384 digest algorithm
 */
const Sha384: DigestAlgorithm = Object.freeze({
  /**
   * Computes the SHA-384 digest for the byte sequence.
   * 
   * @see {@link DigestAlgorithm.compute}
   */
  async compute(input: Uint8Array): Promise<Uint8Array> {
    const bytes = await globalThis.crypto.subtle.digest("SHA-384", input);
    return new Uint8Array(bytes);
  },
});

/**
 * SHA-512 digest algorithm
 */
const Sha512: DigestAlgorithm = Object.freeze({
  /**
   * Computes the SHA-512 digest for the byte sequence.
   * 
   * @see {@link DigestAlgorithm.compute}
   */
  async compute(input: Uint8Array): Promise<Uint8Array> {
    const bytes = await globalThis.crypto.subtle.digest("SHA-512", input);
    return new Uint8Array(bytes);
  },
});

export {
  type DigestAlgorithm,
  Sha256,
  Sha384,
  Sha512,
};
