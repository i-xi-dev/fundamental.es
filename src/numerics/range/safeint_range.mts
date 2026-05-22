import * as _InputError from "../../_internal/_input_error.mts";
import { _ClosedRangeBase } from "./_closed_range_base.mts";
import { _T } from "../../_common/mod.mts";
import { ClosedRange } from "./closed_range.mts";

class _SafeIntClosedRangeImpl<T extends _T.safeint>
  extends _ClosedRangeBase<T> {
  constructor(min: T, max: T) {
    super(min, max);
  }

  protected override _isT(test: unknown): test is T {
    return _T.isSafeInt(test);
  }

  protected override _typeError(): TypeError {
    return _InputError.typeMismatch_SafeInt();
  }
}

export function safeIntClosedRange<T extends _T.safeint>(
  min: T,
  max: T,
): ClosedRange<T> {
  return new _SafeIntClosedRangeImpl<T>(min, max);
}
