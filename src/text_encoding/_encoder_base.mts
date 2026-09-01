import { _Assert, _Type } from "../_common/mod.mts";
import { _BOM } from "./_bom.mts";
import { _EncoderInit } from "./_encoder_init.mts";
import { Encoder } from "./encoder.mts";
import { Fallback } from "./fallback.mts";

export abstract class _EncoderBase implements Encoder {
  readonly #init: _EncoderInit;

  protected constructor(init: _EncoderInit) {
    this.#init = init;
  }

  get encoding(): string {
    return this.#init.name;
  }

  get fatal(): boolean {
    return this.#init.fallback === Fallback.EXCEPTION;
  }

  // get prependBom(): boolean {
  //   return this.#prependBom;
  // }

  encode(input: string): _Type.Bytes {
    _Assert.string(input, "Input");

    const bomToPrepend = (this.#init.prependBom === true) &&
      (input.startsWith(_BOM) !== true);

    const {
      encodedBytes,
      pendingText,
    } = this.#init.encode((bomToPrepend === true) ? (_BOM + input) : input);
    if (pendingText !== null) {
      throw new Error("TODO");
    }

    return encodedBytes;
  }

  //TODO
  // encodeInto(
  //   source: string,
  //   destination: _Type.Bytes,
  // ): TextEncoderEncodeIntoResult {
  // }
}
