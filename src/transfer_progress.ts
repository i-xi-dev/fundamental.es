//

import {
  AbortError,
  TimeoutError,
} from "./error";
import { NumberUtils } from "./number_utils";
import { ProgressEvent } from "./progress_event";

type TransferOptions = {
  total?: number,
  timeout?: number,
  signal?: AbortSignal,
};

type TransferProgressIndicator = {
  loadedUnitCount: number,
  totalUnitCount?: number,
};

type Transferrer<T, U> = {
  chunkGenerator: AsyncGenerator<T, void, void>,
  transferChunk: (chunk: T) => number,
  terminate: () => void,
  transferredResult: () => U,
};

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
class TransferProgress<T, U = T> extends EventTarget {
  readonly #params: {
    used: boolean,
    timerId: number | null,
    timeoutExceeded: boolean,
    abortSignaled: boolean,
    lastProgressNotifiedAt: number,
  };
  readonly #transferrer: Transferrer<T, U>;
  readonly #indicator: TransferProgressIndicator;
  readonly #timeout: number;
  readonly #signal?: AbortSignal;

  /**
   * Creates a new `TransferProgress`.
   * 
   * @param param0 - 
   */
  constructor(transferrer: Transferrer<T, U>, { total, timeout, signal } : TransferOptions = {}) {
    super();

    if (typeof total === "number") {
      if (NumberUtils.isNonNegativeInteger(total) !== true) {
        throw new TypeError("total");
      }
    }
    else if (total !== undefined) {
      throw new TypeError("total");
    }

    this.#params = Object.seal({
      used: false,
      timerId: null,
      timeoutExceeded: false,
      abortSignaled: false,
      lastProgressNotifiedAt: Number.MIN_VALUE,
    });
    this.#transferrer = transferrer;
    this.#indicator = new Proxy<TransferProgressIndicator>({
      loadedUnitCount: 0,
      totalUnitCount: total,
    }, {
      set: (obj: TransferProgressIndicator, prop: string, value: number): boolean => {
        if (prop === "loadedUnitCount") {
          obj[prop] = value;
          this.#notifyProgress();
          return true;
        }
        return false;
      },
    });
    this.#timeout = (typeof timeout === "number") && NumberUtils.isNonNegativeInteger(timeout) ? timeout : Number.POSITIVE_INFINITY;
    this.#signal = signal;
  }

  get total(): number | undefined {
    return this.#indicator.totalUnitCount;
  }

  get loaded(): number {
    return this.#indicator.loadedUnitCount;
  }

  get indeterminate(): boolean {
    return (typeof this.#indicator.totalUnitCount === "number") !== true;
  }

  get percentage(): number {
    return (typeof this.#indicator.totalUnitCount === "number") ? (this.#indicator.loadedUnitCount / this.#indicator.totalUnitCount * 100) : 0;
  }

  async initiate(): Promise<U> {
    const onExpired: () => void = () => {
      this.#transferrer.terminate();
      this.#params.timeoutExceeded = true;
    };
    const onAborted: () => void = () => {
      this.#transferrer.terminate();
      this.#params.abortSignaled = true;
    };

    if (this.#params.used !== false) {
      throw new Error("invalid state");
    }
    this.#params.used = true;

    if (this.#signal?.aborted === true) {
      throw new AbortError("already aborted");
    }

    if (Number.isFinite(this.#timeout)) {
      this.#params.timerId = globalThis.setTimeout(onExpired, this.#timeout) as unknown as number;
    }

    if (this.#signal instanceof AbortSignal) {
      this.#signal.addEventListener("abort", onAborted, {
        once: true,
        passive: true,
      });
    }

    try {
      this.#notifyStarted();

      for await (const chunk of this.#transferrer.chunkGenerator) {
        this.#indicator.loadedUnitCount = this.#transferrer.transferChunk(chunk);
      }

      if (this.#params.timeoutExceeded === true) {
        throw new TimeoutError("timeout");
      }

      if (this.#params.abortSignaled === true) {
        throw new AbortError("aborted");
      }

      this.#notifyCompleted();
      return this.#transferrer.transferredResult();
    }
    catch (exception) {
      if (exception instanceof AbortError) {
        this.#notifyAborted();
      }
      else if (exception instanceof TimeoutError) {
        this.#notifyExpired();
      }
      else {
        this.#notifyFailed();
      }
      throw exception;
    }
    finally {
      this.#notifyEnded();

      if (this.#params.timerId) {
        globalThis.clearTimeout(this.#params.timerId);
      }
      if (this.#signal instanceof AbortSignal) {
        this.#signal.removeEventListener("abort", onAborted);
      }
    }
  }

  #notifyStarted(): void {
    this.#notify("loadstart");
  }

  #notifyProgress(): void {
    const now = performance.now();
    if ((this.#params.lastProgressNotifiedAt + 50) > now) {
      return;
    }
    this.#params.lastProgressNotifiedAt = now;
    this.#notify("progress");
  }

  #notifyCompleted(): void {
    this.#notify("load");
  }

  #notifyExpired(): void {
    this.#notify("timeout");
  }

  #notifyAborted(): void {
    this.#notify("abort");
  }

  #notifyFailed(): void {
    this.#notify("error");
  }

  #notifyEnded(): void {
    this.#notify("loadend");
  }

  #notify(name: string): void {
    const event = new ProgressEvent(name, {
      lengthComputable: this.indeterminate !== true,
      loaded: this.#indicator.loadedUnitCount,
      total: this.#indicator.totalUnitCount, // undefinedの場合ProgressEvent側で0となる
    });
    this.dispatchEvent(event);
  }
}
Object.freeze(TransferProgress);

export {
  type Transferrer,
  type TransferOptions,
  TransferProgress,
};