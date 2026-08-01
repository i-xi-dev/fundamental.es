import { _Assert, _Error, _Type } from "../_common/mod.mts";

export function _normalizeFinite<T extends _Type.finite>(
  value: _Type.finite,
): T {
  return ((value === 0) ? (value + 0) : value) as T; // -0を0
}

// export function _isNonNegativeFinite(value: /* _Type.finite */ unknown): boolean {
//   return _Type.isFinite(value) && _isNonNegative(value);
// }

export function _clampFinite<T extends _Type.finite>(
  value: _Type.finite,
  min: T,
  max: T,
): T {
  return _normalizeFinite<T>(Math.min(Math.max(value, min), max));
}

export namespace Finite {
  export function normalize<T extends _Type.finite>(value: _Type.finite): T {
    _Assert.finite(value, "Input");
    return _normalizeFinite(value);
  }

  // export const isNonNegative = _isNonNegativeFinite;

  export function clamp<T extends _Type.finite>(
    value: _Type.finite,
    min: T,
    max: T,
  ): T {
    _Assert.finite(value, "Input");
    _Assert.finite(min, "Lower bound");
    _Assert.finite(max, "Upper bound");
    if (min > max) {
      throw _Error.Range.contradictory();
    }

    return _clampFinite<T>(value, min, max);
  }
}
