import type { TypeAlias } from "../_internal/type_alias/mod.mts";
import { _normalizeFinite } from "./finite.mts";
import { Type } from "../type/mod.mts";
import { RoundingMode } from "./rounding_mode.mts";

export function _isNonNegative(value: TypeAlias.finite | bigint): boolean {
  return (Type.isNumber(value) || Type.isBigInt(value)) && (value >= 0);
} //XXX 第1h引数はunknownでは

export function _isNonNegativeSafeInt(test: unknown): boolean {
  return Number.isSafeInteger(test) && ((test as number) >= 0);
}

export function _isEvenSafeInt(test: TypeAlias.safeint): boolean {
  return Number.isSafeInteger(test) && ((test % 2) === 0);
}

export function _roundToSafeInt(
  value: TypeAlias.finite,
  roundingMode?: RoundingMode,
): TypeAlias.safeint {
  if (Number.isInteger(value)) {
    return _normalizeFinite<TypeAlias.safeint>(value);
  }

  const integralPart = _normalizeFinite<TypeAlias.safeint>(Math.trunc(value));
  const integralPartIsEven = _isEvenSafeInt(integralPart);

  const nearestP = _normalizeFinite<TypeAlias.safeint>(Math.ceil(value));
  const nearestN = _normalizeFinite<TypeAlias.safeint>(Math.floor(value));
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
