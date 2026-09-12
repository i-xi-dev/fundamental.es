import { TypeAlias } from "../../type/mod.mts";

export function overflow(
  upperLimit: TypeAlias.safeint | bigint,
  target: string,
): RangeError {
  const msg = `${target} must be ${upperLimit} or less`;
  return new RangeError(msg);
}

export function underflow(
  lowerLimit: TypeAlias.safeint | bigint,
  target: string,
): RangeError {
  const msg = `${target} must be ${lowerLimit} or greater`;
  return new RangeError(msg);
}

export function contradictory(): RangeError {
  const msg =
    `The upper limit of the range must be greater than or equal to the lower limit`;
  return new RangeError(msg);
}
