import type { _finite } from "../numerics/_/_type_alias/_def/_defs.mts";
import { _clampFinite } from "../numerics/_internal/common.mts";
import { Type } from "../type/mod.mts";

export interface RgbComponents {
  readonly r: _finite;
  readonly g: _finite;
  readonly b: _finite;
}

export namespace _RgbComponents {
  export function is(test: unknown): test is RgbComponents {
    if (Type.isNonNullObject(test) === true) {
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
      throw Type.Exception.mustBe(
        "an object with the `number`-type properties `r`, `g`, and `b`",
        targetLabel,
      );
    }
  }

  export function normalize(
    src: RgbComponents,
    min: _finite,
    max: _finite,
  ): RgbComponents {
    // 型チェック済みであるものとする

    return {
      r: _clampFinite(src.r, min, max),
      g: _clampFinite(src.g, min, max),
      b: _clampFinite(src.b, min, max),
    };
  }
}
