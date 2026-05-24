import { _T } from "../_common/mod.mts";

export function _normalizeFinite<T extends _T.finite>(value: _T.finite): T {
  return ((value === 0) ? (value + 0) : value) as T; // -0を0
}

// for UintN.rotateLeft(x, offset)
export function _normalizeOffset(
  offset: _T.safeint,
  bitLength: _T.safeint,
): _T.safeint {
  const normalizedOffset = offset % bitLength;
  return (normalizedOffset < 0)
    ? (normalizedOffset + bitLength)
    : normalizedOffset;
}

export function _clampFinite<T extends _T.finite>(
  value: _T.finite,
  min: T,
  max: T,
): T {
  return _normalizeFinite<T>(Math.min(Math.max(value, min), max));
}

function _minOfBigInt(...values: bigint[]): bigint {
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

function _maxOfBigInt(...values: bigint[]): bigint {
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
  return _minOfBigInt(_maxOfBigInt(value, min), max) as T;
}
