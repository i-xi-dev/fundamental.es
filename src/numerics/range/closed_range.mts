import { _Range } from "./_range.mts";
import { TypeAlias } from "../../type/mod.mts";

export interface ClosedRange<
  BaseT extends TypeAlias.numeric,
  T extends BaseT = BaseT,
> extends _Range<BaseT, T> {
  get min(): T;
  get max(): T;
  [Symbol.iterator](): IterableIterator<T, void, void>;
}
