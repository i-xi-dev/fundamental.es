import { RgbComponents } from "./rgb_components.mts";
import { TypeAlias } from "../type/mod.mts";

export abstract class _RgbColor {
  readonly #r: TypeAlias.finite;
  readonly #g: TypeAlias.finite;
  readonly #b: TypeAlias.finite;

  protected constructor(rgb: RgbComponents) {
    this.#r = rgb.r;
    this.#g = rgb.g;
    this.#b = rgb.b;
  }

  get red(): TypeAlias.finite {
    return this.#r;
  }

  get green(): TypeAlias.finite {
    return this.#g;
  }

  get blue(): TypeAlias.finite {
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
