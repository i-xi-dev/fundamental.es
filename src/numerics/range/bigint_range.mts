import * as _InputError from "../../_internal/_input_error.mts";
import { _ClosedRangeBase } from "./_closed_range_base.mts";
import { _T } from "../../_common/mod.mts";
import { ClosedRange } from "./closed_range.mts";

class _BigIntClosedRangeImpl<T extends bigint = bigint>
  extends _ClosedRangeBase<bigint, T> {
  constructor(min: T, max: T) {
    super(min, max);
  }

  protected override _isBaseT(test: unknown): test is bigint {
    return _T.isBigInt(test);
  }

  protected override _typeError(): TypeError {
    return _InputError.typeMismatch_BigInt();
  }
}

export function bigIntClosedRange<T extends bigint = bigint>(
  min: T,
  max: T,
): ClosedRange<bigint, T> {
  return new _BigIntClosedRangeImpl<T>(min, max);
}
