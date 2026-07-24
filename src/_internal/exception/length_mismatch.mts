import { _T } from "../../_common/mod.mts";

const _Type1 = {
  TOO_LONG: 0b0010,
  TOO_SHORT: 0b0100,
} as const;

const _Type2 = {
  CHARS: Symbol(),
  ANY: Symbol(), // Array, ...
} as const;

function _message(
  target: string,
  type1: number,
  type2: symbol,
  len: _T.safeint,
): string {
  const s1 = (type2 === _Type2.CHARS)
    ? `number of \`char\`s in ${target}`
    : `length of ${target}`;

  let s2 = "";
  if (type1 === _Type1.TOO_LONG) {
    s2 = " or less";
  } else if (type1 === _Type1.TOO_SHORT) {
    s2 = " or greater";
  }

  return `The ${s1} must be ${len}${s2}`;
}

class _LengthMismatchError extends RangeError {
  constructor(
    target: string,
    type1: number,
    type2: symbol,
    len: _T.safeint,
  ) {
    super(_message(target, type1, type2, len));
  }
}

export namespace LengthMismatchError {
  export function charsCount(
    target: string,
    expectedCount: _T.safeint,
  ): _LengthMismatchError {
    return new _LengthMismatchError(
      target,
      _Type1.TOO_SHORT + _Type1.TOO_LONG,
      _Type2.CHARS,
      expectedCount,
    );
  }

  export function charsTooLong(
    target: string,
    upperBound: _T.safeint,
  ): _LengthMismatchError {
    return new _LengthMismatchError(
      target,
      _Type1.TOO_LONG,
      _Type2.CHARS,
      upperBound,
    );
  }

  export function charsTooShort(
    target: string,
    lowerBound: _T.safeint,
  ): _LengthMismatchError {
    return new _LengthMismatchError(
      target,
      _Type1.TOO_SHORT,
      _Type2.CHARS,
      lowerBound,
    );
  }

  export function exact(
    target: string,
    expectedLength: _T.safeint,
  ): _LengthMismatchError {
    return new _LengthMismatchError(
      target,
      _Type1.TOO_SHORT + _Type1.TOO_LONG,
      _Type2.ANY,
      expectedLength,
    );
  }

  export function tooLong(
    target: string,
    upperBound: _T.safeint,
  ): _LengthMismatchError {
    return new _LengthMismatchError(
      target,
      _Type1.TOO_LONG,
      _Type2.ANY,
      upperBound,
    );
  }

  export function tooShort(
    target: string,
    lowerBound: _T.safeint,
  ): _LengthMismatchError {
    return new _LengthMismatchError(
      target,
      _Type1.TOO_SHORT,
      _Type2.ANY,
      lowerBound,
    );
  }
}
