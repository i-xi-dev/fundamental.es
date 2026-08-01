import { _T } from "../_common/mod.mts";
import { _RangeError } from "../_internal/mod.mts";

export function _normalizeFinite<T extends _T.finite>(value: _T.finite): T {
  return ((value === 0) ? (value + 0) : value) as T; // -0を0
}

export function _clampFinite<T extends _T.finite>(
  value: _T.finite,
  min: T,
  max: T,
): T {
  return _normalizeFinite<T>(Math.min(Math.max(value, min), max));
}

export namespace Finite {
  export function normalize<T extends _T.finite>(value: _T.finite): T {
    _T.assertFinite(value, "Input");
    return _normalizeFinite(value);
  }

  export function clamp<T extends _T.finite>(
    value: _T.finite,
    min: T,
    max: T,
  ): T {
    _T.assertFinite(value, "Input");
    _T.assertFinite(min, "Lower bound");
    _T.assertFinite(max, "Upper bound");
    if (min > max) {
      throw _RangeError.contradictory();
    }

    return _clampFinite<T>(value, min, max);
  }
}
