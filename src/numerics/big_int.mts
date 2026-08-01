import { _Assert, _T } from "../_common/mod.mts";
import { _RangeError } from "../_internal/mod.mts";

function _minOf(...values: bigint[]): bigint {
  let min = values[0];
  let value: bigint;
  for (let i = 1; i < values.length; i++) {
    value = values[i];

    if (value < min) {
      min = value;
    }
  }
  return min;
}

function _maxOf(...values: bigint[]): bigint {
  let max = values[0];
  let value: bigint;
  for (let i = 1; i < values.length; i++) {
    value = values[i];

    if (value > max) {
      max = value;
    }
  }
  return max;
}

export function _clampBigInt<T extends bigint>(
  value: bigint,
  min: T,
  max: T,
): T {
  return _minOf(_maxOf(value, min), max) as T;
}

export namespace BigInt {
  export function clamp<T extends bigint>(
    value: bigint,
    min: T,
    max: T,
  ): T {
    _Assert.bigInt(value, "Input");
    _Assert.bigInt(min, "Lower bound");
    _Assert.bigInt(max, "Upper bound");
    if (min > max) {
      throw _RangeError.contradictory();
    }

    return _clampBigInt<T>(value, min, max);
  }
}
