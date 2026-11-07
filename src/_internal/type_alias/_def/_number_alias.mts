// number、かつ、isFinite()が真になる値
export type finite = number;

// number、かつ、isSafeInteger()が真になる値
export type safeint = finite;

// number、かつ、isSafeInteger()が真、かつ、非負整数
export type nnint = safeint;

// uintN
export type uint16 = nnint;
export type uint24 = nnint;
export type uint32 = nnint;
export type uint48 = nnint;

// number、かつ、0～0x10FFFF
export type codepoint = nnint;
