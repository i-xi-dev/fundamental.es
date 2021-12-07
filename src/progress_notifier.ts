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

const ProgressNotifierState = Object.freeze({
  BEFORE_START: Symbol(),
  IN_PROGRESS: Symbol(),
  DONE: Symbol(),
  AFTER_END: Symbol(),
});
type ProgressNotifierState = typeof ProgressNotifierState[keyof typeof ProgressNotifierState];

  /*
loadstart 必ず1回
↓
progress 最低1回
↓
abort | load | error | timeout 排他的にどれかが1回
↓
loadend 必ず1回
  */
class ProgressNotifier {
  #target: EventTarget | null;
  #lastProgressNotified: number;
  #state: ProgressNotifierState;

  constructor(target: EventTarget | null) {
    this.#target = target;
    this.#lastProgressNotified = Number.MIN_VALUE;
    this.#state = ProgressNotifierState.BEFORE_START;
    Object.seal(this);
  }

  notifyStart(loaded: number, total?: number): void {
    if (this.#state === ProgressNotifierState.BEFORE_START) {
      this.#notify("loadstart", loaded, total);
      this.#state = ProgressNotifierState.IN_PROGRESS;
    }
    //XXX エラーにする？
  }

  notifyProgress(loaded: number, total?: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      const now = performance.now();
      if ((this.#lastProgressNotified + 50) > now) {
        return;
      }
      this.#lastProgressNotified = now;
      this.#notify("progress", loaded, total);
    }
  }

  notifyCompleted(loaded: number, total?: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      this.#notify("load", loaded, total);
      this.#state = ProgressNotifierState.DONE;
    }
  }

  notifyAborted(loaded: number, total?: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      this.#notify("abort", loaded, total);
      this.#state = ProgressNotifierState.DONE;
    }
  }

  notifyTimeout(loaded: number, total?: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      this.#notify("timeout", loaded, total);
      this.#state = ProgressNotifierState.DONE;
    }
  }

  notifyFailed(loaded: number, total?: number): void {
    if (this.#state === ProgressNotifierState.IN_PROGRESS) {
      this.#notify("error", loaded, total);
      this.#state = ProgressNotifierState.DONE;
    }
  }

  notifyEnd(loaded: number, total?: number): void {
    if (this.#state === ProgressNotifierState.DONE) {
      this.#notify("loadend", loaded, total);
      this.#state = ProgressNotifierState.AFTER_END;
    }
  }

  #notify(name: string, loaded: number, total?: number): void {
    if (this.#target instanceof EventTarget) {
      const event = new ProgressEvent(name, {
        lengthComputable: (total !== undefined),
        loaded,
        total,
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
