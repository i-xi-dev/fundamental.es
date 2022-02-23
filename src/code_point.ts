//

// The Unicode code point

/**
 * The minimum value of the Unicode code points.
 */
const MIN_VALUE = 0x0;

/**
* The maximum value of the Unicode code points.
*/
const MAX_VALUE = 0x10FFFF;

/**
 * The type of 8-bit unsigned integer.
 */
type codepoint = number;

/**
 * Determines whether the passed value is an Unicode code point.
 * 
 * @param value - The value to be tested
 * @returns Whether the passed value is an Unicode code point.
 */
function isCodePoint(value: unknown): value is codepoint {
  if (typeof value === "number") {
    return (Number.isSafeInteger(value) && (value >= MIN_VALUE) && (value <= MAX_VALUE));
  }
  return false;
}

export {
  type codepoint,
  isCodePoint,
};
