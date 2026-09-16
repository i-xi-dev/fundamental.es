import { _Error } from "../../_common/mod.mts";
import { ClosedRange } from "./closed_range.mts";
import { TypeAlias } from "../../type/mod.mts";

export abstract class _ClosedRangeBase<
  BaseT extends TypeAlias.numeric,
  T extends BaseT = BaseT,
> implements ClosedRange<BaseT, T> {
  readonly #min: T;
  readonly #max: T;

  constructor(min: T, max: T) {
    if ((this._isBaseT(min) && this._isBaseT(max)) !== true) {
      throw this._typeError();
    } else if (min > max) {
      throw _Error.Range.contradictory();
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

  contains(test: BaseT): boolean {
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
