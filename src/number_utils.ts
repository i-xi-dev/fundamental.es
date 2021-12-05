//

/**
 * Determines whether the passed value is a nonnegative safe integer.
 * 
 * @param value - The value to be tested
 * @returns Whether the passed value is a nonnegative safe integer.
 */
function isNonNegativeInteger(value: unknown): boolean {
  if (typeof value === "number") {
    return Number.isSafeInteger(value) && value >= 0;
  }
  return false;
}

/**
 * Determines whether the passed value is a positive safe integer.
 * 
 * @param value - The value to be tested
 * @returns Whether the passed value is a positive safe integer.
 */
function isPositiveInteger(value: unknown): boolean {
  if (typeof value === "number") {
    return Number.isSafeInteger(value) && value > 0;
  }
  return false;
}

/**
 * The utilities for number processing.
 */
const NumberUtils = Object.freeze({
  isNonNegativeInteger,
  isPositiveInteger,
});

export { NumberUtils };
