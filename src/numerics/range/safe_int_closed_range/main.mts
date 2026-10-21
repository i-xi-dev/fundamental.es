import { _ClosedRangeBase } from "../_closed_range_base.mts";
import { _Error } from "../../../_common/mod.mts";
import { _isSafeInt, _normalizeFinite } from "../../_internal/common.mts";
import { _NumericException } from "../../_internal/error/mod.mts";
import { ClosedRange } from "../closed_range.mts";
import { Type } from "../../../type/mod.mts";
import { TypeAlias } from "../../../_internal/type_alias/mod.mts";

class _SafeIntClosedRangeImpl<T extends TypeAlias.safeint = TypeAlias.safeint>
  extends _ClosedRangeBase<TypeAlias.safeint, T> {
  constructor(min: T, max: T) {
    super(
      _normalizeFinite<T>(min),
      _normalizeFinite<T>(max),
    );
  }

  protected override _isBaseT(test: unknown): test is TypeAlias.safeint {
    return Type.isNumber(test) && _isSafeInt(test);
  }

  protected override _typeError(): TypeError {
    return _NumericException.mustBeSafeInteger("Input");
  }
}

export function of<T extends TypeAlias.safeint = TypeAlias.safeint>(
  min: T,
  max: T,
): ClosedRange<TypeAlias.safeint, T> {
  //TODO assert min,max
  return new _SafeIntClosedRangeImpl<T>(min, max);
}
