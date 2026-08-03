export const Alphabet = {
  BASE64: "base64",
  BASE64URL: "base64url",
} as const;

export type Alphabet = typeof Alphabet[keyof typeof Alphabet];
