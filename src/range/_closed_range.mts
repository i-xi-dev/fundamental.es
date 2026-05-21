import { _Range } from "./_range.mts";

export interface _ClosedRange<T> extends _Range<T> {
  get min(): T;
  get max(): T;
  [Symbol.iterator](): Iterator<T>;
}
