import { _Assert, _Type } from "../_common/mod.mts";
import { _BOM } from "./_bom.mts";
import { _EncoderInit } from "./_encoder_init.mts";
import { Encoder } from "./encoder.mts";
import { Fallback } from "./fallback.mts";

export abstract class _EncoderBase implements Encoder {
  readonly #encoding: string;
  readonly #prependBom: boolean;
  protected readonly _fatal: boolean;

  protected constructor(init: _EncoderInit) {
    this.#encoding = init.name;

    this.#prependBom = init.prependBom === true;
    this._fatal = init.fallback === Fallback.EXCEPTION;
  }

  get encoding(): string {
    return this.#encoding;
  }

  // get fatal(): boolean {
  //   return this._fatal;
  // }

  // get prependBom(): boolean {
  //   return this.#prependBom;
  // }

  encode(input: string): _Type.Bytes {
    _Assert.string(input, "Input");

    const bomToPrepend = (this.#prependBom === true) &&
      (input.startsWith(_BOM) !== true);

    if (bomToPrepend === true) {
      return this._encode(_BOM + input);
    } else {
      return this._encode(input);
    }
  }

  protected abstract _encode(_encode: string): _Type.Bytes;

  //TODO
  // encodeInto(
  //   source: string,
  //   destination: _Type.Bytes,
  // ): TextEncoderEncodeIntoResult {
  // }
}
