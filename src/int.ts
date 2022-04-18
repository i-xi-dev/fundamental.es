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
}

export {
  type int,
  Integer,
};
