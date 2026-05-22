/**  */
export type finite = number;

/** Safe-integer */
export type safeint = number;

/** unsigned integer */
export type _unit = safeint; // かならず0を含む

export type _biguint = bigint;

export type _numeric = number | bigint;
