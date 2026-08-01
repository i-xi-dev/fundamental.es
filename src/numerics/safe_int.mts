import { _Assert, _T } from "../_common/mod.mts";
import { _normalizeFinite } from "./finite.mts";
import { RoundingMode } from "./rounding_mode.mts";

// export function _isNonNegativeSafeInt(value: /* _T.safeint*/ unknown): boolean {
//   return _T.isSafeInt(value) && isNonNegative(value);
// }

export function _isEvenSafeInt(test: /* _T.safeint*/ unknown): boolean {
  return _T.isSafeInt(test) && ((test % 2) === 0);
}

export function _roundToSafeInt(
  value: _T.finite,
  roundingMode?: RoundingMode,
): _T.safeint {
  if (Number.isInteger(value)) {
    return _normalizeFinite<_T.safeint>(value);
  }

  const integralPart = _normalizeFinite<_T.safeint>(Math.trunc(value));
  const integralPartIsEven = _isEvenSafeInt(integralPart);

  const nearestP = _normalizeFinite<_T.safeint>(Math.ceil(value));
  const nearestN = _normalizeFinite<_T.safeint>(Math.floor(value));
  const sourceIsNegative = value < 0;
  const nearestPH = nearestP - 0.5;
  const nearestNH = nearestN + 0.5;

  const halfUp = (): number => {
    return (value >= nearestPH) ? nearestP : nearestN;
  };

  const halfDown = (): number => {
    return (value <= nearestNH) ? nearestN : nearestP;
  };

  switch (roundingMode) {
    case RoundingMode.CEIL:
      return nearestP;

    case RoundingMode.FLOOR:
      return nearestN;

    case RoundingMode.TRUNC:
      return integralPart;

    case RoundingMode.EXPAND:
      return sourceIsNegative ? nearestN : nearestP;

    case RoundingMode.HALF_CEIL:
      return halfUp();

    case RoundingMode.HALF_FLOOR:
      return halfDown();

    case RoundingMode.HALF_TRUNC:
      return sourceIsNegative ? halfUp() : halfDown();

    case RoundingMode.HALF_EVEN:
      if (sourceIsNegative) {
        if (value === nearestPH) {
          return integralPartIsEven ? integralPart : nearestN;
        }
        return halfDown();
      }

      if (value === nearestNH) {
        return integralPartIsEven ? integralPart : nearestP;
      }
      return halfUp();

    default: // case RoundingMode.HALF_EXPAND:
      return sourceIsNegative ? halfDown() : halfUp();
  }
}

export namespace SafeInt {
  // export const isNonNegative = _isNonNegativeSafeInt;

  export const isEven = _isEvenSafeInt;

  export function round(
    value: _T.finite,
    roundingMode?: RoundingMode,
  ): _T.safeint {
    _Assert.finite(value, "Input");
    return _roundToSafeInt(value, roundingMode);
  }
}
