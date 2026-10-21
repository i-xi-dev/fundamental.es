import {
  _assertFinite,
  _clampFinite,
  _isFinite,
  _normalizeFinite,
} from "../_internal/common.mts";
import { RangeException } from "../../_internal/range_error/mod.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export { _isFinite as is };

export { _assertFinite as assert };

export function normalize<T extends TypeAlias.finite>(
  value: TypeAlias.finite,
): T {
  _assertFinite(value, "Input");
  return _normalizeFinite(value);
}

// export isNonNegativeFinite

export function clamp<T extends TypeAlias.finite>(
  value: TypeAlias.finite,
  min: T,
  max: T,
): T {
  _assertFinite(value, "Input");
  _assertFinite(min, "Lower bound");
  _assertFinite(max, "Upper bound");
  if (min > max) {
    throw RangeException.rangeInvalid();
  }

  return _clampFinite<T>(value, min, max);
}
