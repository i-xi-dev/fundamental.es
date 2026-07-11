import * as _T from "../_type/mod.mts";

export function normalizeFinite<T extends _T.finite>(value: _T.finite): T {
  return ((value === 0) ? (value + 0) : value) as T; // -0を0
}

export function clampFinite<T extends _T.finite>(
  value: _T.finite,
  min: T,
  max: T,
): T {
  return normalizeFinite<T>(Math.min(Math.max(value, min), max));
}
