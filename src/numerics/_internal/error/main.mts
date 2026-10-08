export function mustBeNonNegativeSafeInteger(target: string): RangeError {
  return new RangeError(
    `${target} must be a \`number\` within the range of non-negative safe-integer`,
  );
}
