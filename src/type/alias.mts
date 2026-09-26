// TSで定義できない型（用の別名）

// number、かつ、isFinite()が真になる値
export type finite = number;
export type degrees = finite;
export type radians = finite;
export type gradians = finite;
export type turns = finite;

// number、かつ、isSafeInteger()が真になる値
export type safeint = finite;

// number、かつ、isSafeInteger()が真、かつ、非負整数
export type nnint = safeint;

export type uint16 = nnint;

export type uint24 = nnint;

export type uint32 = nnint;

export type uint48 = nnint;

// bigint、かつ、非負整数
export type bignnint = bigint;

export type biguint64 = bignnint;

export type biguint128 = bignnint;

// number、かつ、0～0x10FFFF
export type codepoint = nnint;

// string、かつ、U+0000からU+FFFFまでの1コードユニットからなる1文字
export type char16 = string;

// string、かつ、U+0000以上の1コードポイントからなる1文字
export type char32 = string;

export type numeric = number | bigint;

export type Bytes = Uint8Array<ArrayBuffer>;
