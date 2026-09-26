import { Assert, Radix } from "../numerics/mod.mts";
import { Char16, Text } from "../textual/mod.mts";
import { TypeAlias } from "../type/mod.mts";

const _ZERO_TURN_DEGS = 0;
const _ONE_TURN_DEGS = 360;

function _normalizeDegrees(degs: number): TypeAlias.degrees {
  Assert.finite(degs, "Input");

  const t = degs % _ONE_TURN_DEGS;
  return (t < _ZERO_TURN_DEGS) ? (t + _ONE_TURN_DEGS) : t;
}

function _radiansToDegrees(rads: number): TypeAlias.degrees {
  Assert.finite(rads, "Input");

  const degs = rads * (180 / Math.PI);
  return _normalizeDegrees(degs);
}

function _degreesToRadians(degs: number): TypeAlias.radians {
  Assert.finite(degs, "Input");

  return _normalizeDegrees(degs) * (Math.PI / 180);
}

function _gradiansToDegrees(grads: number): TypeAlias.degrees {
  Assert.finite(grads, "Input");

  const degs = grads * (180 / 200);
  return _normalizeDegrees(degs);
}

//XXX _degreesToGradians

function _turnsToDegrees(turns: number): TypeAlias.degrees {
  Assert.finite(turns, "Input");

  const degs = turns * _ONE_TURN_DEGS;
  return _normalizeDegrees(degs);
}

//XXX _degreesToTurns

type _DmsStringOptions = {
  fractionalSecondDigits?: 0 | 1 | 2 | 3;
};

function _degreesToDmsString(
  degs: TypeAlias.degrees,
  options?: _DmsStringOptions,
): string {
  Assert.finite(degs, "Input");

  const normalizedDegrees = _normalizeDegrees(degs);

  const dInt = Math.trunc(normalizedDegrees);
  const dStr = dInt.toString(Radix.DECIMAL);

  const msNum = (normalizedDegrees - dInt) * 60;
  const mInt = Math.trunc(msNum);
  const mStr = mInt.toString(Radix.DECIMAL).padStart(2, Char16.DIGIT_ZERO);

  const sNum = (msNum - mInt) * 60;
  const sInt = Math.trunc(sNum);
  const sStr = ((sInt < 10) ? Char16.DIGIT_ZERO : Text.EMPTY) +
    sNum.toFixed(options?.fractionalSecondDigits);

  return `${dStr}°${mStr}′${sStr}″`;
}

export class Angle {
  #degs: TypeAlias.degrees;

  private constructor(degs: TypeAlias.degrees) {
    this.#degs = _normalizeDegrees(degs);
  }

  static ofDegrees(degs: /* TypeAlias.degrees */ number): Angle {
    return new Angle(degs);
  }

  static ofRadians(rads: /* TypeAlias.radians */ number): Angle {
    return new Angle(_radiansToDegrees(rads));
  }

  toDegrees(): TypeAlias.degrees {
    return this.#degs;
  }

  toRadians(): TypeAlias.radians {
    return _degreesToRadians(this.#degs);
  }

  valueOf(): TypeAlias.degrees {
    return this.#degs;
  }

  // オプション指定したければIntl.NumberFormatでやれば良い
  toString(): string {
    let radAsStr = this.toRadians().toFixed(3);
    radAsStr = radAsStr.replace(/.?0+$/, Text.EMPTY);
    return `${radAsStr} rad`;
  }

  toDmsString(options?: _DmsStringOptions): string {
    return _degreesToDmsString(this.#degs, options);
  }
}

export namespace Angle {
  export type DmsStringOptions = _DmsStringOptions;

  export namespace Degrees {
    export const normalize = _normalizeDegrees;
    export const fromRadians = _radiansToDegrees;
    export const toRadians = _degreesToRadians;
    export const fromGradians = _gradiansToDegrees;
    //XXX toGradians
    export const fromTurns = _turnsToDegrees;
    //XXX toTurns
    export const toDmsString = _degreesToDmsString;
  }
}
