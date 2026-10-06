import type { TypeAlias } from "../_internal/type_alias/mod.mts";
import * as NumericTypeAssert from "./_type_ext/assert.mts";
import { _Error } from "../_common/mod.mts";

export function _normalizeFinite<T extends TypeAlias.finite>(
  value: TypeAlias.finite,
): T {
  return ((value === 0) ? (value + 0) : value) as T; // -0を0
}

export function _clampFinite<T extends TypeAlias.finite>(
  value: TypeAlias.finite,
  min: T,
  max: T,
): T {
  return _normalizeFinite<T>(Math.min(Math.max(value, min), max));
}

export namespace Finite {
  export function normalize<T extends TypeAlias.finite>(
    value: TypeAlias.finite,
  ): T {
    NumericTypeAssert.finite(value, "Input");
    return _normalizeFinite(value);
  }

  // export isNonNegativeFinite

  export function clamp<T extends TypeAlias.finite>(
    value: TypeAlias.finite,
    min: T,
    max: T,
  ): T {
    NumericTypeAssert.finite(value, "Input");
    NumericTypeAssert.finite(min, "Lower bound");
    NumericTypeAssert.finite(max, "Upper bound");
    if (min > max) {
      throw _Error.Range.contradictory();
    }

    return _clampFinite<T>(value, min, max);
  }
}
