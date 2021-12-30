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

// async function getSubtleCrypto(): Promise<SubtleCrypto> {
//   if (globalThis.crypto) {
//     return globalThis.crypto.subtle;
//   }
//   else {
//     const nodeMod = "node:crypto"; // 直接import("node:*")とするとdenoでエラー
//     const { webcrypto } = await import(nodeMod); // webpackでバンドルするとimportしなくなる
//     return webcrypto.subtle;
//   }
// }

// /**
//  * SHA-256 digest algorithm
//  */
// const Sha256: DigestAlgorithm = Object.freeze({
//   /**
//    * Computes the SHA-256 digest for the byte sequence.
//    * 
//    * @see {@link DigestAlgorithm.compute}
//    */
//   async compute(input: Uint8Array): Promise<Uint8Array> {
//     const subtleCrypto = await getSubtleCrypto();
//     const bytes = await subtleCrypto.digest("SHA-256", input);
//     return new Uint8Array(bytes);
//   },
// });

export {
  type DigestAlgorithm,
  // Sha256,
};
