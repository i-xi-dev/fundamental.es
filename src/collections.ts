//

import { NumberUtils } from "./number_utils";

class SizedMap<K, V> extends Map<K, V> {
  #maxSize: number;

  constructor(maxSize: number) {
    super();
    if (NumberUtils.isPositiveInteger(maxSize) !== true) {
      throw new TypeError("maxSize");
    }
    this.#maxSize = maxSize;
  }

  override set(key: K, value: V): this {
    super.set(key, value);
    if (this.size > this.#maxSize) {
      this.delete([ ...this.keys() ][0] as K);
    }
    return this;
  }
}
Object.freeze(SizedMap);

export {
  SizedMap,
};