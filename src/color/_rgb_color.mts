import type { _finite } from "../numerics/_/_type_alias/_def/_defs.mts";
import { RgbComponents } from "./rgb_components.mts";

export abstract class _RgbColor {
  readonly #r: _finite;
  readonly #g: _finite;
  readonly #b: _finite;

  protected constructor(rgb: RgbComponents) {
    this.#r = rgb.r;
    this.#g = rgb.g;
    this.#b = rgb.b;
  }

  get red(): _finite {
    return this.#r;
  }

  get green(): _finite {
    return this.#g;
  }

  get blue(): _finite {
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
