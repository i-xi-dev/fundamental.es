import { _T } from "../_common/mod.mts";

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
}
