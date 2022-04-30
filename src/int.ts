//

type int = number;

namespace Integer {
  /**
   * Determines whether the passed value is a nonnegative safe integer.
   * 
   * @param value The value to be tested
   * @returns Whether the passed value is a nonnegative safe integer.
   */
  export function isNonNegativeInteger(value: unknown): boolean {
    if (typeof value === "number") {
      return Number.isSafeInteger(value) && value >= 0;
    }
    return false;
  }

  /**
   * Determines whether the passed value is a positive safe integer.
   * 
   * @param value The value to be tested
   * @returns Whether the passed value is a positive safe integer.
   */
  export function isPositiveInteger(value: unknown): boolean {
    if (typeof value === "number") {
      return Number.isSafeInteger(value) && value > 0;
    }
    return false;
  }

  export type Range = [ min: int, max: int ];

  export function inRange(value: int, minmax: Range): boolean {
    if (Number.isSafeInteger(value) !== true) {
      throw new TypeError("value");
    }
    if (_isRangeTuple(minmax) !== true) {
      throw new TypeError("minmax");
    }

    const [ min, max ] = minmax;
    if (min > max) {
      throw new RangeError("minmax");
    }

    return ((value >= min) && (value <= max));
  }

}

function _isRangeTuple(value: unknown): value is Integer.Range {
  return (Array.isArray(value) && (value.length === 2) && value.every((i) => Number.isSafeInteger(i)));
}

export {
  type int,
  Integer,
};
