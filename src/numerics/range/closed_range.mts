import type { _numeric } from "../_/_type_alias/_def/_defs.mts";
import { _Range } from "./_range.mts";

export interface ClosedRange<
  BaseT extends _numeric,
  T extends BaseT = BaseT,
> extends _Range<BaseT, T> {
  get min(): T;
  get max(): T;
  [Symbol.iterator](): IterableIterator<T, void, void>;
}
