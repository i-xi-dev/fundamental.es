import type { _safeint } from "../../_/_type_alias/_def/_defs.mts";
import { _ClosedRangeBase } from "../_closed_range_base.mts";
import { _Error } from "../../../_common/mod.mts";
import {
  _isSafeInteger,
  _mustBeSafeInteger,
} from "../../_/_type_alias/_safe_int.mts";
import { _normalizeFinite } from "../../_internal/common.mts";
import { _NumericException } from "../../_internal/error/mod.mts";
import { ClosedRange } from "../closed_range.mts";
import { Type } from "../../../type/mod.mts";

class _SafeIntClosedRangeImpl<T extends _safeint = _safeint>
  extends _ClosedRangeBase<_safeint, T> {
  constructor(min: T, max: T) {
    super(
      _normalizeFinite<T>(min),
      _normalizeFinite<T>(max),
    );
  }

  protected override _isBaseT(test: unknown): test is _safeint {
    return Type.isNumber(test) && _isSafeInteger(test);
  }

  protected override _typeError(): TypeError {
    return _mustBeSafeInteger("Input");
  }
}

export function of<T extends _safeint = _safeint>(
  min: T,
  max: T,
): ClosedRange<_safeint, T> {
  // assert (min is _safeint) →コンストラクターでチェックされる
  // assert (max is _safeint) →コンストラクターでチェックされる
  // assert (min <= max) →コンストラクターでチェックされる

  return new _SafeIntClosedRangeImpl<T>(min, max);
}
