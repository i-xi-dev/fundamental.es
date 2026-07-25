import { _ClosedRangeBase } from "./_closed_range_base.mts";
import { _T } from "../../_common/mod.mts";
import { ClosedRange } from "./closed_range.mts";
import { TypeMismatchError } from "../../_internal/mod.mts";

class _BigIntClosedRangeImpl<T extends bigint = bigint>
  extends _ClosedRangeBase<bigint, T> {
  constructor(min: T, max: T) {
    super(min, max);
  }

  protected override _isBaseT(test: unknown): test is bigint {
    return _T.isBigInt(test);
  }

  protected override _typeError(): TypeError {
    return TypeMismatchError.bigInt("Input");
  }
}

export function bigIntClosedRange<T extends bigint = bigint>(
  min: T,
  max: T,
): ClosedRange<bigint, T> {
  return new _BigIntClosedRangeImpl<T>(min, max);
}
