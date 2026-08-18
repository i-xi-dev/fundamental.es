import { _clampFinite } from "../../numerics/finite.mts";
import { _Error, _Type } from "../../_common/mod.mts";
import { _Hsl } from "./hsl.mts";
import { _Rgb } from "./_rgb.mts";
import { _RgbComponents, RgbComponents } from "../rgb_components.mts";
import { Angle } from "../../geometrics/mod.mts";

const _W_MIN = 0;

const _W_MAX = 1;

const _B_MIN = 0;

const _B_MAX = 1;

export type Hwb = {
  h: _Type.degrees;
  w: _Type.finite;
  b: _Type.finite;
};

export namespace _Hwb {
  export function is(test: unknown): test is Hwb {
    if (_Type.isNonNullObject(test) === true) {
      if (("h" in test) && ("w" in test) && ("b" in test)) {
        return _Type.isFinite(test.h) &&
          _Type.isFinite(test.w) &&
          _Type.isFinite(test.b);
      }
    }

    return false;
  }

  export function assert(
    test: unknown,
    targetLabel: string,
  ): asserts test is Hwb {
    if (is(test) !== true) {
      throw _Error.Type.mustBe("TODO", targetLabel);
    }
  }

  export function normalize(hsl: Hwb): Hwb {
    // 型チェック済みであるものとする

    return {
      h: Angle.Degrees.normalize(hsl.h),
      w: _clampFinite(hsl.w, _W_MIN, _W_MAX),
      b: _clampFinite(hsl.b, _B_MIN, _B_MAX),
    };
  }

  export function fromRgbComponents(rgb: RgbComponents): Hwb {
    const { h } = _Hsl.fromRgbComponents(rgb);
    const { r, g, b } = _RgbComponents.normalize(
      rgb,
      _Rgb.COMPONENT_MIN,
      _Rgb.COMPONENT_MAX,
    );

    const w = Math.min(r, g, b);
    const blackness = 1 - Math.max(r, g, b);
    return { h, w, b: blackness };
  }

  export function toRgbComponents(hwb: Hwb): RgbComponents {
    // 型チェック済みであるものとする

    const { h, w, b } = normalize(hwb);

    if (w + b >= 1) {
      const g = w / (w + b);
      return {
        r: g,
        g: g,
        b: g,
      };
    }

    const rgb = _Hsl.toRgbComponents({ h, s: 1, l: 0.5 });
    return {
      r: (rgb.r * (1 - w - b)) + w,
      g: (rgb.g * (1 - w - b)) + w,
      b: (rgb.b * (1 - w - b)) + w,
    };
  }
}
