import { _ClosedRangeBase } from "./_closed_range_base.mts";
import { _normalizeFinite } from "../_utils.mts";
import { _T } from "../../_common/mod.mts";
import { ClosedRange } from "./closed_range.mts";
import { Exception } from "../../_internal/mod.mts";

class _SafeIntClosedRangeImpl<T extends _T.safeint = _T.safeint>
  extends _ClosedRangeBase<_T.safeint, T> {
  constructor(min: T, max: T) {
    super(_normalizeFinite<T>(min), _normalizeFinite<T>(max));
  }

  protected override _isBaseT(test: unknown): test is _T.safeint {
    return _T.isSafeInt(test);
  }

  protected override _typeError(): TypeError {
    return Exception.TypeMismatch.safeInt("Input");
  }
}

export function safeIntClosedRange<T extends _T.safeint = _T.safeint>(
  min: T,
  max: T,
): ClosedRange<_T.safeint, T> {
  return new _SafeIntClosedRangeImpl<T>(min, max);
}
