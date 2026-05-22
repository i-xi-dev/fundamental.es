import { _numeric } from "../../_common/_type/_typedef/_number.mts";
import { _Range } from "./_range.mts";

export interface ClosedRange<T extends _numeric> extends _Range<T> {
  get min(): T;
  get max(): T;
  [Symbol.iterator](): IterableIterator<T, void, void>;
}
