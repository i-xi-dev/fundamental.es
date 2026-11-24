import { RangeException } from "../../../_internal/range_error/mod.mts";

export function mustBeNonNegativeSafeInteger(target: string): RangeError {
  return RangeException.of(
    `${target} must be a \`number\` within the range of non-negative safe-integer`,
  );
}
