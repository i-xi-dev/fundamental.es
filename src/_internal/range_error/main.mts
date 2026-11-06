import type { TypeAlias } from "../type_alias/mod.mts";

export function of(message: string): RangeError {
  return new RangeError(message);
}

export function rangeOverflow(
  upperLimit: TypeAlias.safeint | bigint,
  target: string,
): RangeError {
  return of(`${target} must be ${upperLimit} or less`);
}

export function rangeUnderflow(
  lowerLimit: TypeAlias.safeint | bigint,
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
  upperBound: TypeAlias.safeint,
): RangeError {
  return of(`The length of ${target} must be ${upperBound} or less`);
}

export function lengthTooShort(
  target: string,
  lowerBound: TypeAlias.safeint,
): RangeError {
  return of(`The length of ${target} must be ${lowerBound} or greater`);
}

export function lengthUnexpected(
  target: string,
  expectedLength: TypeAlias.safeint,
): RangeError {
  return of(`The length of ${target} must be ${expectedLength}`);
}

export function countTooMany(
  target: string,
  itemDesc: string, // ex. char countなら \`char\`s とか
  upperBound: TypeAlias.safeint,
): RangeError {
  return of(
    `The number of ${itemDesc} in ${target} must be ${upperBound} or less`,
  );
}

export function countTooFew(
  target: string,
  itemDesc: string, // ex. char countなら \`char\`s とか
  lowerBound: TypeAlias.safeint,
): RangeError {
  return of(
    `The number of ${itemDesc} in ${target} must be ${lowerBound} or greater`,
  );
}

export function countUnexpected(
  target: string,
  itemDesc: string, // ex. char countなら \`char\`s とか
  expectedCount: TypeAlias.safeint,
): RangeError {
  return of(`The number of ${itemDesc} in ${target} must be ${expectedCount}`);
}
