import type { _safeint } from "../../numerics/_/_type_alias/_def/_defs.mts";

export function of(message: string): RangeError {
  return new RangeError(message);
}

export function rangeOverflow(
  upperLimit: _safeint | bigint,
  target: string,
): RangeError {
  return of(`${target} must be ${upperLimit} or less`);
}

export function rangeUnderflow(
  lowerLimit: _safeint | bigint,
  target: string,
): RangeError {
  return of(`${target} must be ${lowerLimit} or greater`);
}

export function rangeInvalid(): RangeError {
  return of(
    `The upper limit of the range must be greater than or equal to the lower limit`,
  );
}

export function lengthTooLong(
  target: string,
  upperBound: _safeint,
): RangeError {
  return of(`The length of ${target} must be ${upperBound} or less`);
}

export function lengthTooShort(
  target: string,
  lowerBound: _safeint,
): RangeError {
  return of(`The length of ${target} must be ${lowerBound} or greater`);
}

export function lengthUnexpected(
  target: string,
  expectedLength: _safeint,
): RangeError {
  return of(`The length of ${target} must be ${expectedLength}`);
}

export function countTooMany(
  target: string,
  itemDesc: string, // ex. char countなら \`char\`s とか
  upperBound: _safeint,
): RangeError {
  return of(
    `The number of ${itemDesc} in ${target} must be ${upperBound} or less`,
  );
}

export function countTooFew(
  target: string,
  itemDesc: string, // ex. char countなら \`char\`s とか
  lowerBound: _safeint,
): RangeError {
  return of(
    `The number of ${itemDesc} in ${target} must be ${lowerBound} or greater`,
  );
}

export function countUnexpected(
  target: string,
  itemDesc: string, // ex. char countなら \`char\`s とか
  expectedCount: _safeint,
): RangeError {
  return of(`The number of ${itemDesc} in ${target} must be ${expectedCount}`);
}
