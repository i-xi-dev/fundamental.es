import * as _InputError from "../../_internal/_input_error.mts";
import { _numeric } from "../../_common/_type/_typedef/_number.mts";
import { ClosedRange } from "./closed_range.mts";

export abstract class _ClosedRangeBase<T extends _numeric>
  implements ClosedRange<T> {
  readonly #min: T;
  readonly #max: T;

  constructor(min: T, max: T) {
    if ((this._isT(min) && this._isT(max)) !== true) {
      throw this._typeError();
    } else if (min > max) {
      throw _InputError.rangeImpossible();
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

  protected abstract _isT(test: unknown): test is T;

  protected abstract _typeError(): TypeError;

  contains(test: T): boolean {
    return this._isT(test) && (test >= this.#min) && (test <= this.#max);
  }

  [Symbol.iterator](): IterableIterator<T, void, void> {
    return (function* (min: T, max: T) {
      for (let i = min; i <= max; i++) {
        yield i;
      }
    })(this.#min, this.#max);
  }
}
