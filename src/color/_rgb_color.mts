import { _Type } from "../_common/mod.mts";
import { RgbComponents } from "./rgb_components.mts";

export abstract class _RgbColor {
  readonly #r: _Type.finite;
  readonly #g: _Type.finite;
  readonly #b: _Type.finite;

  protected constructor(rgb: RgbComponents) {
    this.#r = rgb.r;
    this.#g = rgb.g;
    this.#b = rgb.b;
  }

  get red(): _Type.finite {
    return this.#r;
  }

  get green(): _Type.finite {
    return this.#g;
  }

  get blue(): _Type.finite {
    return this.#b;
  }

  toRgbComponents(): RgbComponents {
    return {
      r: this.#r,
      g: this.#g,
      b: this.#b,
    };
  }
}
