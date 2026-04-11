export const _Alphabet = {
  BASE64: "base64",
  BASE64URL: "base64url",
} as const;

export type _Alphabet = typeof _Alphabet[keyof typeof _Alphabet];
