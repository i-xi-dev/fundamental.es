//

import { NumberUtils } from "./number_utils";

/**
 * The `ProgressEvent` for Node.js
 * 
 * Implements the {@link [ProgressEvent](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)} interface.
 */
class _ProgressEvent extends Event implements ProgressEvent<EventTarget> {
  #lengthComputable: boolean;
  #loaded: number;
  #total: number;

  /**
   * Creates a new `_ProgressEvent`.
   * 
   * @param type - The name of the event.
   * @param init - The `ProgressEventInit` object.
   */
  constructor(type: string, init?: ProgressEventInit) {
    super(type, init);

    this.#lengthComputable = (init && (typeof init.lengthComputable === "boolean")) ? init.lengthComputable : false;
    this.#loaded = (init && (typeof init.loaded === "number") && NumberUtils.isNonNegativeInteger(init.loaded)) ? init.loaded : 0;
    this.#total = (init && (typeof init.total === "number") && NumberUtils.isNonNegativeInteger(init.total)) ? init.total : 0;
  }

  /**
   * @see {@link [ProgressEvent.lengthComputable](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent/lengthComputable)}
   */
  get lengthComputable(): boolean {
    return this.#lengthComputable;
  }

  /**
   * @see {@link [ProgressEvent.loaded](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent/loaded)}
   */
  get loaded(): number {
    return this.#loaded;
  }

  /**
   * @see {@link [ProgressEvent.total](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent/total)}
   */
  get total(): number {
    return this.#total;
  }
}
const pe = (globalThis.ProgressEvent) ? globalThis.ProgressEvent : _ProgressEvent;

type ProgressOptions = {
  total?: number,
  timeout?: number,
  signal?: AbortSignal,
};

const ProgressNotifierState = Object.freeze({
  BEFORE_START: Symbol("ProgressNotifierState.BEFORE_START"),
  IN_PROGRESS: Symbol("ProgressNotifierState.IN_PROGRESS"),
  DONE: Symbol("ProgressNotifierState.DONE"),
  AFTER_END: Symbol("ProgressNotifierState.AFTER_END"),
});
type ProgressNotifierState = typeof ProgressNotifierState[keyof typeof ProgressNotifierState];

/**
 * 進捗
 * 
 * 
 * ## `ProgressEvent`の発火順管理
 * 
 * 有効な発火順は下表の通り（xhrやFileReaderの仕様を参考にした）
 * ※異なる順で発火させようとした場合は無視する //XXX エラーにすべき？
 * 
 * | `type` | 発火回数 |
 * | :--- | :--- |
 * | `"loadstart"` | 1回のみ |
 * | `"progress"` | 最低1回 |
 * | `"load"`, `"abort"`, `"timeout"`, `"error"` | 排他的にどれかが1回 |
 * | `"loadend"` | 1回のみ |
 * 
 * 
 * ## `ProgressEvent`の`total`と`lengthComputable`の設定
 * 
 * コンストラクタに渡した`total`と、 `ProgressEvent`にセットされる`total`, `lengthComputable`の関係については下表の通り
 * ※xhrやFileReaderの仕様とは異なることに注意
 * - xhrの仕様書では、totalが0でなければlengthComputableはtrue（xhr仕様書では長さ不明な場合totalを0にしている）
 * - FileReaderでは（仕様書には見当たらないが）ブラウザの実装はtotalが0でもlengthComputableはtrue（FileReaderでは長さは明らかであり、長さ0もありうる）
 * 
 * | コンストラクタに渡した`total` | `ProgressEvent`にセットされる`lengthComputable` | `ProgressEvent`にセットされる`total` |
 * | :--- | :--- | :--- |
 * | `undefined` | `false` | `0` |
 * | `0` | `true` | `0` |
 * | 1以上 | `true` | コンストラクタに渡した`total`と同じ |
 */
class Progress extends EventTarget {
  #state: ProgressNotifierState;
  #total?: number;
  #indeterminate: boolean;
  #value: number;
  #lastProgressNotified: number;
  #timeout: number;
  #startedAt: number;
  #signal?: AbortSignal;

  /**
   * Creates a new `Progress`.
   * 
   * @param param0 - 
   */
  constructor({ total, timeout, signal } : ProgressOptions = {}) {
    super();

    if (typeof this.total === "number") {
      if (NumberUtils.isNonNegativeInteger(total) !== true) {
        throw new TypeError("total");
      }
    }
    else if (this.total !== undefined) {
      throw new TypeError("total");
    }

    this.#state = ProgressNotifierState.BEFORE_START;
    this.#total = total;
    this.#indeterminate = !((typeof this.#total === "number") && (this.#total >= 0));
    this.#value = 0;
    this.#lastProgressNotified = Number.MIN_VALUE;
    this.#timeout = (typeof timeout === "number") && NumberUtils.isNonNegativeInteger(timeout) ? timeout : Number.POSITIVE_INFINITY;
    this.#startedAt = 0;
    this.#signal = signal;
  }

  get total(): number | undefined {
    return this.#total;
  }

  get indeterminate(): boolean {
    return this.#indeterminate;
  }

  get value(): number {
    return this.#value;
  }

  get percentage(): number {
    if (this.#indeterminate === true) {
      return 0;
    }
    return this.#value / (this.#total as number) * 100;
  }

  protected get _signal(): AbortSignal | undefined {
    return this.#signal;
  }

  protected _isBeforeStart(): boolean {
    return (this.#state === ProgressNotifierState.BEFORE_START);
  }

  start(): void {
    console.assert(this._isBeforeStart(), "invalid state");

    this.#startedAt = performance.now();
    this.#notify("loadstart");
    this.#state = ProgressNotifierState.IN_PROGRESS;
  }

  update(value: number): void {
    console.assert(this.#state === ProgressNotifierState.IN_PROGRESS, "invalid state");

    this.#value = value;
    const now = performance.now();
    if ((this.#lastProgressNotified + 50) > now) {
      return;
    }
    this.#lastProgressNotified = now;
    this.#notify("progress");
  }

  complete(): void {
    console.assert(this.#state === ProgressNotifierState.IN_PROGRESS, "invalid state");

    this.#notify("load");
    this.#state = ProgressNotifierState.DONE;
  }

  isExpired(): boolean {
    const elapsed = performance.now() - this.#startedAt;
    if (elapsed >= this.#timeout) {
      this.#expire();
      return true;
    }
    return false;
  }

  #expire(): void {
    console.assert(this.#state === ProgressNotifierState.IN_PROGRESS, "invalid state");

    this.#notify("timeout");
    this.#state = ProgressNotifierState.DONE;
  }

  abort(): void {
    console.assert(this.#state === ProgressNotifierState.IN_PROGRESS, "invalid state");

    this.#notify("abort");
    this.#state = ProgressNotifierState.DONE;
  }

  fail(): void {
    console.assert(this.#state === ProgressNotifierState.IN_PROGRESS, "invalid state");

    this.#notify("error");
    this.#state = ProgressNotifierState.DONE;
  }

  end(): void {
    console.assert(this.#state === ProgressNotifierState.DONE, "invalid state");

    this.#notify("loadend");
    this.#state = ProgressNotifierState.AFTER_END;
  }

  #notify(name: string): void {
    const event = new pe(name, {
      lengthComputable: this.#indeterminate !== true,
      loaded: this.#value,
      total: this.#total, // undefinedの場合ProgressEvent側で0となる
    });
    this.dispatchEvent(event);
  }
}
Object.freeze(Progress);

export type {
  ProgressOptions,
};

export {
  Progress,
};
