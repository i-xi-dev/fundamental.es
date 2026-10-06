import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import { _Range } from "./_range.mts";

export interface ClosedRange<
  BaseT extends TypeAlias.numeric,
  T extends BaseT = BaseT,
> extends _Range<BaseT, T> {
  get min(): T;
  get max(): T;
  [Symbol.iterator](): IterableIterator<T, void, void>;
}
