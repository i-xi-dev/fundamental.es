import { _ClosedRangeBase } from "./_closed_range_base.mts";
import { _Error, _Type } from "../../_common/mod.mts";
import { ClosedRange } from "./closed_range.mts";

class _BigIntClosedRangeImpl<T extends bigint = bigint>
  extends _ClosedRangeBase<bigint, T> {
  constructor(min: T, max: T) {
    super(min, max);
  }

  protected override _isBaseT(test: unknown): test is bigint {
    return _Type.isBigInt(test);
  }

  protected override _typeError(): TypeError {
    return _Error.Type.bigInt("Input");
  }
}

export function bigIntClosedRange<T extends bigint = bigint>(
  min: T,
  max: T,
): ClosedRange<bigint, T> {
  return new _BigIntClosedRangeImpl<T>(min, max);
}
