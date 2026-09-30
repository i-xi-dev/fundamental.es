import { Type, TypeAlias } from "../type/mod.mts";

const _EMPTY = "";

type _char16s = IterableIterator<TypeAlias.char16, void, void>;

type _char32s = IterableIterator<TypeAlias.char32, void, void>;

type _FromOptions = {
  allowMalformed?: boolean;
};

export class Text {
  readonly #char16Count: TypeAlias.safeint;
  readonly #value: string;

  private constructor(value: string) {
    this.#char16Count = value.length;
    this.#value = value;
  }

  get #runes(): Array<TypeAlias.char32> { //XXX キャッシュする？
    return [...this.#value];
  }

  get char16Count(): TypeAlias.safeint {
    return this.#char16Count;
  }

  get char32Count(): TypeAlias.safeint {
    return this.#runes.length;
  }

  static fromString(value: string, options: _FromOptions): Text {
    Type.Assert.string(value, "Input");

    if (options?.allowMalformed !== true) {
      if (value.isWellFormed() !== true) {
        throw new Error("TODO");
      }
    }

    return new Text(value);
  }

  //TODO
  // static fromBytes(bytes: TypeAlias.Bytes, options: _FromOptions): Text {
  // }

  toString(): string {
    return this.#value;
  }

  toChar16s(): _char16s {
    return (function* (s: string) {
      for (let i = 0; i < s.length; i++) {
        yield s.charAt(i);
      }
    })(this.#value);
  }

  toChar32s(): _char32s {
    return this.#runes[Symbol.iterator]();
  }

  // toBytes(): TypeAlias.Bytes {
  // }
}

export namespace Text {
  export const EMPTY = _EMPTY;

  export function isNonEmpty(test: unknown): boolean {
    return Type.isString(test) && (test.length > 0);
  }
}
