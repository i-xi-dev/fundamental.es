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

export function charsCount(
  target: string,
  expectedCount: _T.safeint,
): RangeError {
  const msg = _message(
    target,
    _Type1.TOO_SHORT + _Type1.TOO_LONG,
    _Type2.CHARS,
    expectedCount,
  );
  return new RangeError(msg);
}

export function charsTooLong(
  target: string,
  upperBound: _T.safeint,
): RangeError {
  const msg = _message(target, _Type1.TOO_LONG, _Type2.CHARS, upperBound);
  return new RangeError(msg);
}

export function charsTooShort(
  target: string,
  lowerBound: _T.safeint,
): RangeError {
  const msg = _message(target, _Type1.TOO_SHORT, _Type2.CHARS, lowerBound);
  return new RangeError(msg);
}

export function exact(target: string, expectedLength: _T.safeint): RangeError {
  const msg = _message(
    target,
    _Type1.TOO_SHORT + _Type1.TOO_LONG,
    _Type2.ANY,
    expectedLength,
  );
  return new RangeError(msg);
}

export function tooLong(target: string, upperBound: _T.safeint): RangeError {
  const msg = _message(target, _Type1.TOO_LONG, _Type2.ANY, upperBound);
  return new RangeError(msg);
}

export function tooShort(target: string, lowerBound: _T.safeint): RangeError {
  const msg = _message(target, _Type1.TOO_SHORT, _Type2.ANY, lowerBound);
  return new RangeError(msg);
}
