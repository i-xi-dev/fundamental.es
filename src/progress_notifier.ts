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

type ProgressNotifierOptions = {
  total?: number,
  target?: EventTarget,
};

const ProgressNotifierState = Object.freeze({
  BEFORE_START: Symbol("ProgressNotifierState.BEFORE_START"),
  IN_PROGRESS: Symbol("ProgressNotifierState.IN_PROGRESS"),
  DONE: Symbol("ProgressNotifierState.DONE"),
  AFTER_END: Symbol("ProgressNotifierState.AFTER_END"),
});
type ProgressNotifierState = typeof ProgressNotifierState[keyof typeof ProgressNotifierState];

/**
 * `ProgressEvent`の発火ヘルパー
 * 
 * 
 * ## 発火順管理
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
class ProgressNotifier {
  #total?: number;
  #lengthComputable: boolean;
  #target: EventTarget;
  #lastProgressNotified: number;
  #state: ProgressNotifierState;

  /**
   * Creates a new `ProgressNotifier`.
   * 
   * @param param0 - あ
   * @param param0.total - あ
   * @param param0.target - あ
   */
  constructor({ total, target } : ProgressNotifierOptions = {}) {
    this.#total = total;
    this.#lengthComputable = ((typeof this.#total === "number") && (this.#total >= 0));
    if (target instanceof EventTarget) {
      this.#target = target;
    }
    else {
      this.#target = new EventTarget();
    }
    this.#lastProgressNotified = Number.MIN_VALUE;
    this.#state = ProgressNotifierState.BEFORE_START;
    Object.seal(this);
  }

  get target(): EventTarget {
    return this.#target;
  }

  notifyStart(loaded: number): void {
    if (this.#state === ProgressNotifierState.BEFORE_START) {
      this.#notify("loadstart", loaded);
      this.#state = ProgressNotifierState.IN_PROGRESS;
    }
  }

  notifyProgress(loaded: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      const now = performance.now();
      if ((this.#lastProgressNotified + 50) > now) {
        return;
      }
      this.#lastProgressNotified = now;
      this.#notify("progress", loaded);
    }
  }

  notifyCompleted(loaded: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      this.#notify("load", loaded);
      this.#state = ProgressNotifierState.DONE;
    }
  }

  notifyAborted(loaded: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      this.#notify("abort", loaded);
      this.#state = ProgressNotifierState.DONE;
    }
  }

  notifyExpired(loaded: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      this.#notify("timeout", loaded);
      this.#state = ProgressNotifierState.DONE;
    }
  }

  notifyFailed(loaded: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      this.#notify("error", loaded);
      this.#state = ProgressNotifierState.DONE;
    }
  }

  notifyEnd(loaded: number): void {
    if (this.#state === ProgressNotifierState.DONE) {
      this.#notify("loadend", loaded);
      this.#state = ProgressNotifierState.AFTER_END;
    }
  }

  #notify(name: string, loaded: number): void {
    if (this.#target instanceof EventTarget) {
      const event = new pe(name, {
        lengthComputable: this.#lengthComputable,
        loaded,
        total: this.#total, // undefinedの場合ProgressEvent側で0となる
      });
      this.#target.dispatchEvent(event);
    }
  }
}
Object.freeze(ProgressNotifier);

export {
  pe as ProgressEvent,
  ProgressNotifier,
};
