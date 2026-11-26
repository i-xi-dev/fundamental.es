import type { _safeint } from "../../numerics/_/_type_alias/_def/_defs.mts";
import { _isNonNullObject } from "../../_/_type/_non_null_object.mts";
import { _isNumber } from "../../_/_type/_number.mts";
import { _isSafeInteger } from "../../numerics/_/_type_alias/_safe_int.mts";
import { _RgbComponents, RgbComponents } from "../rgb_components.mts";
import { _roundToSafeInt } from "../../numerics/_internal/common.mts";
import { _SRgbRgb } from "./_rgb.mts";
import { RoundingMode, Uint8 } from "../../numerics/mod.mts";
import { Type } from "../../type/mod.mts";

export type Rgb24 = {
  r: /* _uint8 */ _safeint;
  g: /* _uint8 */ _safeint;
  b: /* _uint8 */ _safeint;
};

export namespace _Rgb24 {
  export function is(test: unknown): test is Rgb24 {
    if (_isNonNullObject(test) === true) {
      if (("r" in test) && ("g" in test) && ("b" in test)) {
        return _isNumber(test.r) &&
          _isSafeInteger(test.r) &&
          _isNumber(test.g) &&
          _isSafeInteger(test.g) &&
          _isNumber(test.b) &&
          _isSafeInteger(test.b);
      }
    }

    return false;
  }

  export function assert(test: unknown, label: string): asserts test is Rgb24 {
    if (is(test) !== true) {
      throw Type.Exception.mustBe(
        "an object with properties `r`, `g`, and `b`, which are 8-bit unsigned integers of type `number`",
        label,
      );
    }
  }

  export function fromRgbComponents(rgb: RgbComponents): Rgb24 {
    _RgbComponents.assert(rgb, "Input");
    const normalized = _SRgbRgb.normalize(rgb);

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
