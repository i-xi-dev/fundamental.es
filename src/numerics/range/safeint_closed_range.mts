import { _ClosedRangeBase } from "./_closed_range_base.mts";
import { _Error, _Type } from "../../_common/mod.mts";
import { _normalizeFinite } from "../finite.mts";
import { ClosedRange } from "./closed_range.mts";

class _SafeIntClosedRangeImpl<T extends _Type.safeint = _Type.safeint>
  extends _ClosedRangeBase<_Type.safeint, T> {
  constructor(min: T, max: T) {
    super(
      _normalizeFinite<T>(min),
      _normalizeFinite<T>(max),
    );
  }

  protected override _isBaseT(test: unknown): test is _Type.safeint {
    return _Type.isSafeInt(test);
  }

  protected override _typeError(): TypeError {
    return _Error.Type.safeInt("Input");
  }
}

export function safeIntClosedRange<T extends _Type.safeint = _Type.safeint>(
  min: T,
  max: T,
): ClosedRange<_Type.safeint, T> {
  //TODO assert min,max
  return new _SafeIntClosedRangeImpl<T>(min, max);
}
