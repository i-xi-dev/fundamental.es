import { _Assert, _Type } from "../_common/mod.mts";
import { _BOM } from "./_bom.mts";
import { _bytesStartsWith } from "../byte_sequence/_utils.mts";
import { _DecoderInit } from "./_decoder_init.mts";
import { Decoder } from "./decoder.mts";
import { Fallback } from "./fallback.mts";

export abstract class _DecoderBase implements Decoder {
  readonly #encoding: string;
  readonly #bomBytes: _Type.Bytes;
  readonly #ignoreBom: boolean;
  // protected readonly _replacement: string;
  protected readonly _fatal: boolean;

  protected constructor(init: _DecoderInit) {
    _Assert.nonEmptyString(init.name, "Encoding name");
    _Assert.nonSharedUint8Array(init.bomBytes, "TODO");
    _Assert.nonEmptyString(init.replacement, "TODO"); //TODO 1-char

    this.#encoding = init.name;
    this.#bomBytes = Uint8Array.of(...init.bomBytes);
    this.#ignoreBom = init.ignoreBom === true;
    // this._replacement = init.replacement;
    this._fatal = init.fallback === Fallback.EXCEPTION;
  }

  get encoding(): string {
    return this.#encoding;
  }

  // get fatal(): boolean {
  //   return this._fatal;
  // }

  // get ignoreBom(): boolean {
  //   return this.#ignoreBom;
  // }

  decode(input: _Type.Bytes): string {
    _Assert.nonSharedUint8Array(input, "Input");

    const bomToRemove = (this.#ignoreBom !== true) &&
      _bytesStartsWith(input, this.#bomBytes);

    const output = this._decode(input);

    return (bomToRemove === true) ? output.substring(_BOM.length) : output;
  }

  protected abstract _decode(input: _Type.Bytes): string;
}
