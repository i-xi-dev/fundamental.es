import type { _finite } from "../numerics/_/_type_alias/_def/_defs.mts";
import { _assertFinite } from "../numerics/_/_type_alias/_finite.mts";
import { Radix } from "../numerics/mod.mts";
import { Text } from "../textuals/mod.mts";
import _Char from "../textuals/_char/_enum.mts";

const _ZERO_TURN_DEGS = 0;
const _ONE_TURN_DEGS = 360;

function _normalizeDegrees(degrees: number): _finite {
  _assertFinite(degrees, "Input");

  const t = degrees % _ONE_TURN_DEGS;
  return (t < _ZERO_TURN_DEGS) ? (t + _ONE_TURN_DEGS) : t;
}

function _radiansToDegrees(radians: number): _finite {
  _assertFinite(radians, "Input");

  const degrees = radians * (180 / Math.PI);
  return _normalizeDegrees(degrees);
}

function _degreesToRadians(degrees: number): _finite {
  _assertFinite(degrees, "Input");

  return _normalizeDegrees(degrees) * (Math.PI / 180);
}

function _gradiansToDegrees(gradians: number): _finite {
  _assertFinite(gradians, "Input");

  const degrees = gradians * (180 / 200);
  return _normalizeDegrees(degrees);
}

//XXX _degreesToGradians

function _turnsToDegrees(turns: number): _finite {
  _assertFinite(turns, "Input");

  const degrees = turns * _ONE_TURN_DEGS;
  return _normalizeDegrees(degrees);
}

//XXX _degreesToTurns

type _DmsStringOptions = {
  fractionalSecondDigits?: 0 | 1 | 2 | 3;
};

function _degreesToDmsString(
  degrees: _finite,
  options?: _DmsStringOptions,
): string {
  _assertFinite(degrees, "Input");

  const normalizedDegrees = _normalizeDegrees(degrees);

  const dInt = Math.trunc(normalizedDegrees);
  const dStr = dInt.toString(Radix.DECIMAL);

  const msNum = (normalizedDegrees - dInt) * 60;
  const mInt = Math.trunc(msNum);
  const mStr = mInt.toString(Radix.DECIMAL).padStart(2, _Char.DIGIT_ZERO);

  const sNum = (msNum - mInt) * 60;
  const sInt = Math.trunc(sNum);
  const sStr = ((sInt < 10) ? _Char.DIGIT_ZERO : Text.EMPTY) +
    sNum.toFixed(options?.fractionalSecondDigits);

  return `${dStr}°${mStr}′${sStr}″`;
}

export class Angle {
  #degrees: _finite;

  private constructor(degrees: _finite) {
    this.#degrees = _normalizeDegrees(degrees);
  }

  static ofDegrees(degrees: /* _finite */ number): Angle {
    return new Angle(degrees);
  }

  static ofRadians(radians: /* _finite */ number): Angle {
    return new Angle(_radiansToDegrees(radians));
  }

  toDegrees(): _finite {
    return this.#degrees;
  }

  toRadians(): _finite {
    return _degreesToRadians(this.#degrees);
  }

  valueOf(): _finite {
    return this.#degrees;
  }

  // オプション指定したければIntl.NumberFormatでやれば良い
  toString(): string {
    let radAsStr = this.toRadians().toFixed(3);
    radAsStr = radAsStr.replace(/.?0+$/, Text.EMPTY);
    return `${radAsStr} rad`;
  }

  toDmsString(options?: _DmsStringOptions): string {
    return _degreesToDmsString(this.#degrees, options);
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
