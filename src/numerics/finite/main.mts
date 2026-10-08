import { _clampFinite, _normalizeFinite } from "../_internal/common.mts";
import { _NumericTypeError } from "../_internal/type_error/mod.mts";
import { RangeException } from "../../_internal/range_error/mod.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export function normalize<T extends TypeAlias.finite>(
  value: TypeAlias.finite,
): T {
  TypeAlias.assertFinite(value, "Input");
  return _normalizeFinite(value);
}

// export isNonNegativeFinite

export function clamp<T extends TypeAlias.finite>(
  value: TypeAlias.finite,
  min: T,
  max: T,
): T {
  TypeAlias.assertFinite(value, "Input");
  TypeAlias.assertFinite(min, "Lower bound");
  TypeAlias.assertFinite(max, "Upper bound");
  if (min > max) {
    throw RangeException.rangeInvalid();
  }

  return _clampFinite<T>(value, min, max);
}
