import { _clampFinite } from "../../numerics/finite.mts";
import { _Error, _Type } from "../../_common/mod.mts";
import { _RgbComponents, RgbComponents } from "../rgb_components.mts";
import { _SRgbRgb } from "./_rgb.mts";
import { Angle } from "../../geometrics/mod.mts";

const _S_MIN = 0;

const _S_MAX = 1;

const _L_MIN = 0;

const _L_MAX = 1;

export type Hsl = {
  h: _Type.degrees;
  s: _Type.finite;
  l: _Type.finite;
};

function _f(n: number, { h, s, l }: Hsl): number {
  const k = (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

export namespace _Hsl {
  export function is(test: unknown): test is Hsl {
    if (_Type.isNonNullObject(test) === true) {
      if (("h" in test) && ("s" in test) && ("l" in test)) {
        return _Type.isFinite(test.h) &&
          _Type.isFinite(test.s) &&
          _Type.isFinite(test.l);
      }
    }

    return false;
  }

  export function assert(
    test: unknown,
    targetLabel: string,
  ): asserts test is Hsl {
    if (is(test) !== true) {
      throw _Error.Type.mustBe(
        "an object with the `number`-type properties `h`, `s`, and `l`",
        targetLabel,
      );
    }
  }

  export function normalize(hsl: Hsl): Hsl {
    // 型チェック済みであるものとする

    return {
      h: Angle.Degrees.normalize(hsl.h),
      s: _clampFinite(hsl.s, _S_MIN, _S_MAX),
      l: _clampFinite(hsl.l, _L_MIN, _L_MAX),
    };
  }

  export function fromRgbComponents(rgb: RgbComponents): Hsl {
    const { r, g, b } = _SRgbRgb.normalize(rgb);

    const maxRgb = Math.max(r, g, b);
    const minRgb = Math.min(r, g, b);

    const d = maxRgb - minRgb;

    let h = 0;
    if (d !== 0) {
      switch (maxRgb) {
        case r:
          h = (g - b) / d;
          break;

        case g:
          h = ((b - r) / d) + 2;
          break;

        // case b:
        default:
          h = ((r - g) / d) + 4;
          break;
      }
      h = Angle.Degrees.normalize(h * 60);
    }

    const l = (minRgb + maxRgb) / 2;

    let s = 0;
    if (d !== 0) {
      if ((l !== 0) && (l !== 1)) {
        s = (maxRgb - l) / Math.min(l, 1 - l);
      }
    }
    return { h, s, l };
  }

  export function toRgbComponents(hsl: Hsl): RgbComponents {
    // 型チェック済みであるものとする

    const normalized = normalize(hsl);
    return {
      r: _f(0, normalized),
      g: _f(8, normalized),
      b: _f(4, normalized),
    };
  }
}
