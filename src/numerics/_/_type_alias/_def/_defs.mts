// number、かつ、isFinite()が真になる値
export type _finite = number;

// number、かつ、isSafeInteger()が真になる値
export type _safeint = _finite;

// uintN
export type _uint16 = _safeint;
export type _uint24 = _safeint;
export type _uint32 = _safeint;
export type _uint48 = _safeint;

// biguintN
export type _biguint64 = bigint;
export type _biguint128 = bigint;
