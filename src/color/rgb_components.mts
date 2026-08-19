import { _clampFinite } from "../numerics/finite.mts";
import { _Error, _Type } from "../_common/mod.mts";

export interface RgbComponents {
  readonly r: _Type.finite;
  readonly g: _Type.finite;
  readonly b: _Type.finite;
}

export namespace _RgbComponents {
  export function is(test: unknown): test is RgbComponents {
    if (_Type.isNonNullObject(test) === true) {
      if (("r" in test) && ("g" in test) && ("b" in test)) {
        return _Type.isFinite(test.r) &&
          _Type.isFinite(test.g) &&
          _Type.isFinite(test.b);
      }
    }

    return false;
  }

  export function assert(
    test: unknown,
    targetLabel: string,
  ): asserts test is RgbComponents {
    if (is(test) !== true) {
      throw _Error.Type.mustBe(
        "an object with the `number`-type properties `r`, `g`, and `b`",
        targetLabel,
      );
    }
  }

  export function normalize(
    src: RgbComponents,
    min: _Type.finite,
    max: _Type.finite,
  ): RgbComponents {
    // 型チェック済みであるものとする

    return {
      r: _clampFinite(src.r, min, max),
      g: _clampFinite(src.g, min, max),
      b: _clampFinite(src.b, min, max),
    };
  }
}
