import { _numeric } from "../../_common/_type/_typedef/_number.mts";
import { _RangeError } from "../../_internal/mod.mts";
import { ClosedRange } from "./closed_range.mts";

export abstract class _ClosedRangeBase<
  BaseT extends _numeric,
  T extends BaseT = BaseT,
> implements ClosedRange<BaseT, T> {
  readonly #min: T;
  readonly #max: T;

  constructor(min: T, max: T) {
    if ((this._isBaseT(min) && this._isBaseT(max)) !== true) {
      throw this._typeError();
    } else if (min > max) {
      throw _RangeError.contradictory();
    }

    this.#min = min;
    this.#max = max;
  }

  get min(): T {
    return this.#min;
  }

  get max(): T {
    return this.#max;
  }

  protected abstract _isBaseT(test: unknown): test is BaseT;

  protected abstract _typeError(): TypeError;

  contains(test: BaseT): test is T {
    return this._isBaseT(test) && (test >= this.#min) && (test <= this.#max);
  }

  [Symbol.iterator](): IterableIterator<T, void, void> {
    return (function* (min: T, max: T) {
      for (let i = min; i <= max; i++) {
        yield i;
      }
    })(this.#min, this.#max);
  }
}
