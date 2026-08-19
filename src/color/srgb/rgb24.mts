import { _Error, _Type } from "../../_common/mod.mts";
import { _Rgb } from "./_rgb.mts";
import { _RgbComponents, RgbComponents } from "../rgb_components.mts";
import { _roundToSafeInt } from "../../numerics/safe_int.mts";
import { RoundingMode, Uint8 } from "../../numerics/mod.mts";

export type Rgb24 = {
  r: /* _Type.uint8 */ _Type.safeint;
  g: /* _Type.uint8 */ _Type.safeint;
  b: /* _Type.uint8 */ _Type.safeint;
};

export namespace _Rgb24 {
  export function is(test: unknown): test is Rgb24 {
    if (_Type.isNonNullObject(test) === true) {
      if (("r" in test) && ("g" in test) && ("b" in test)) {
        return _Type.isSafeInt(test.r) &&
          _Type.isSafeInt(test.g) &&
          _Type.isSafeInt(test.b);
      }
    }

    return false;
  }

  export function assert(
    test: unknown,
    targetLabel: string,
  ): asserts test is Rgb24 {
    if (is(test) !== true) {
      throw _Error.Type.mustBe("TODO", targetLabel);
    }
  }

  export function fromRgbComponents(rgb: RgbComponents): Rgb24 {
    _RgbComponents.assert(rgb, "Input");
    const normalized = _RgbComponents.normalize(
      rgb,
      _Rgb.COMPONENT_MIN,
      _Rgb.COMPONENT_MAX,
    );

    return {
      r: _roundToSafeInt(
        normalized.r * Uint8.MAX_VALUE,
        RoundingMode.HALF_CEIL,
      ),
      g: _roundToSafeInt(
        normalized.g * Uint8.MAX_VALUE,
        RoundingMode.HALF_CEIL,
      ),
      b: _roundToSafeInt(
        normalized.b * Uint8.MAX_VALUE,
        RoundingMode.HALF_CEIL,
      ),
    };
  }

  export function toRgbComponents(bytes: Rgb24): RgbComponents {
    // 型チェック済みであるものとする

    return {
      r: Uint8.saturateFrom(bytes.r) / Uint8.MAX_VALUE,
      g: Uint8.saturateFrom(bytes.g) / Uint8.MAX_VALUE,
      b: Uint8.saturateFrom(bytes.b) / Uint8.MAX_VALUE,
    };
  }
}
