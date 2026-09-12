import { _clampFinite } from "../numerics/finite.mts";
import { _Error, _Type } from "../_common/mod.mts";
import { TypeAlias } from "../type/mod.mts";

export interface RgbComponents {
  readonly r: TypeAlias.finite;
  readonly g: TypeAlias.finite;
  readonly b: TypeAlias.finite;
}

export namespace _RgbComponents {
  export function is(test: unknown): test is RgbComponents {
    if (_Type.isNonNullObject(test) === true) {
      if (("r" in test) && ("g" in test) && ("b" in test)) {
        return Number.isFinite(test.r) &&
          Number.isFinite(test.g) &&
          Number.isFinite(test.b);
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
    min: TypeAlias.finite,
    max: TypeAlias.finite,
  ): RgbComponents {
    // 型チェック済みであるものとする

    return {
      r: _clampFinite(src.r, min, max),
      g: _clampFinite(src.g, min, max),
      b: _clampFinite(src.b, min, max),
    };
  }
}
