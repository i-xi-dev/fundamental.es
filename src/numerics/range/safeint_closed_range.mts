import { _ClosedRangeBase } from "./_closed_range_base.mts";
import { _Error, _Type } from "../../_common/mod.mts";
import { _normalizeFinite } from "../finite.mts";
import { ClosedRange } from "./closed_range.mts";
import { TypeAlias } from "../../type/mod.mts";

class _SafeIntClosedRangeImpl<T extends TypeAlias.safeint = TypeAlias.safeint>
  extends _ClosedRangeBase<TypeAlias.safeint, T> {
  constructor(min: T, max: T) {
    super(
      _normalizeFinite<T>(min),
      _normalizeFinite<T>(max),
    );
  }

  protected override _isBaseT(test: unknown): test is TypeAlias.safeint {
    return Number.isSafeInteger(test);
  }

  protected override _typeError(): TypeError {
    return _Error.Type.mustBeSafeInt("Input");
  }
}

export function safeIntClosedRange<
  T extends TypeAlias.safeint = TypeAlias.safeint,
>(
  min: T,
  max: T,
): ClosedRange<TypeAlias.safeint, T> {
  //TODO assert min,max
  return new _SafeIntClosedRangeImpl<T>(min, max);
}
