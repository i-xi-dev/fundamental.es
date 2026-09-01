import { _Assert, _Type } from "../_common/mod.mts";
import { _BOM } from "./_bom.mts";
import { _bytesStartsWith } from "../byte_sequence/_utils.mts";
import { _DecoderInit } from "./_decoder_init.mts";
import { Decoder } from "./decoder.mts";
import { Fallback } from "./fallback.mts";

export abstract class _DecoderBase implements Decoder {
  readonly #init: _DecoderInit;

  protected constructor(init: _DecoderInit) {
    this.#init = init;
  }

  get encoding(): string {
    return this.#init.name;
  }

  get fatal(): boolean {
    return this.#init.fallback === Fallback.EXCEPTION;
  }

  // get ignoreBom(): boolean {
  //   return this.#ignoreBom;
  // }

  decode(input: _Type.Bytes): string {
    _Assert.nonSharedUint8Array(input, "Input");

    const bomToRemove = (this.#init.ignoreBom !== true) &&
      _bytesStartsWith(input, this.#init.bomBytes);

    const { decodedText, pendingBytes } = this.#init.decode(input);
    if (pendingBytes !== null) {
      throw new Error("TODO");
    }

    return (bomToRemove === true)
      ? decodedText.substring(_BOM.length)
      : decodedText;
  }
}
