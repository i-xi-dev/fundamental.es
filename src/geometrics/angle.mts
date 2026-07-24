import { _T, StringUtils } from "../_common/mod.mts";
import { Radix } from "../numerics/mod.mts";

const _ZERO_TURN_DEGS = 0;
const _ONE_TURN_DEGS = 360;

function _normalizeDegrees(degs: number): _T.degrees {
  _T.assertFinite(degs, "Input");

  const t = degs % _ONE_TURN_DEGS;
  return (t < _ZERO_TURN_DEGS) ? (t + _ONE_TURN_DEGS) : t;
}

function _radiansToDegrees(rads: number): _T.degrees {
  _T.assertFinite(rads, "Input");

  const degs = rads * (180 / Math.PI);
  return _normalizeDegrees(degs);
}

function _degreesToRadians(degs: number): _T.radians {
  _T.assertFinite(degs, "Input");

  return _normalizeDegrees(degs) * (Math.PI / 180);
}

function _gradiansToDegrees(grads: number): _T.degrees {
  _T.assertFinite(grads, "Input");

  const degs = grads * (180 / 200);
  return _normalizeDegrees(degs);
}

//XXX _degreesToGradians

function _turnsToDegrees(turns: number): _T.degrees {
  _T.assertFinite(turns, "Input");

  const degs = turns * _ONE_TURN_DEGS;
  return _normalizeDegrees(degs);
}

//XXX _degreesToTurns

type _DmsStringOptions = {
  fractionalSecondDigits?: 0 | 1 | 2 | 3;
};

function _degreesToDmsString(
  degs: _T.degrees,
  options?: _DmsStringOptions,
): string {
  _T.assertFinite(degs, "Input");

  const normalizedDegrees = _normalizeDegrees(degs);

  const dInt = Math.trunc(normalizedDegrees);
  const dStr = dInt.toString(Radix.DECIMAL);

  const msNum = (normalizedDegrees - dInt) * 60;
  const mInt = Math.trunc(msNum);
  const mStr = mInt.toString(Radix.DECIMAL).padStart(2, "0");

  const sNum = (msNum - mInt) * 60;
  const sInt = Math.trunc(sNum);
  const sStr = ((sInt < 10) ? "0" : "") +
    sNum.toFixed(options?.fractionalSecondDigits);

  return `${dStr}°${mStr}′${sStr}″`;
}

export class Angle {
  #degs: _T.degrees;

  private constructor(degs: _T.degrees) {
    this.#degs = _normalizeDegrees(degs);
  }

  static ofDegrees(degs: /* _T.degrees */ number): Angle {
    return new Angle(degs);
  }

  static ofRadians(rads: /* _T.radians */ number): Angle {
    return new Angle(_radiansToDegrees(rads));
  }

  toDegrees(): _T.degrees {
    return this.#degs;
  }

  toRadians(): _T.radians {
    return _degreesToRadians(this.#degs);
  }

  valueOf(): _T.degrees {
    return this.#degs;
  }

  // オプション指定したければIntl.NumberFormatでやれば良い
  toString(): string {
    let radAsStr = this.toRadians().toFixed(3);
    radAsStr = radAsStr.replace(/.?0+$/, StringUtils.EMPTY);
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
