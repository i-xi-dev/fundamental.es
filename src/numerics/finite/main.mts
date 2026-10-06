import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import { _clampFinite, _normalizeFinite } from "../_internal/common.mts";
import { _Error } from "../../_common/mod.mts";
import { _NumericTypeError } from "../_internal/type_error/mod.mts";

export function assertFinite(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isFinite(test) !== true) {
    throw _NumericTypeError.mustBeFinite(targetLabel);
  }
}

export function normalize<T extends TypeAlias.finite>(
  value: TypeAlias.finite,
): T {
  assertFinite(value, "Input");
  return _normalizeFinite(value);
}

// export isNonNegativeFinite

export function clamp<T extends TypeAlias.finite>(
  value: TypeAlias.finite,
  min: T,
  max: T,
): T {
  assertFinite(value, "Input");
  assertFinite(min, "Lower bound");
  assertFinite(max, "Upper bound");
  if (min > max) {
    throw _Error.Range.contradictory();
  }

  return _clampFinite<T>(value, min, max);
}
