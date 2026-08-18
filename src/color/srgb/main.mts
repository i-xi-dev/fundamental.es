import { _Assert, _Error, _Type } from "../../_common/mod.mts";
import { _Hsl, Hsl as HslType } from "./hsl.mts";
import { _Rgb } from "./_rgb.mts";
import { _Rgb24Components, Rgb24Components } from "./rgb24_components.mts";
import { _RgbColor } from "../_rgb_color.mts";
import { _RgbComponents, RgbComponents } from "../rgb_components.mts";

export class SRgbColor extends _RgbColor {
  #_hsl: HslType | null = null;

  private constructor(rgb: RgbComponents) {
    super(rgb);
  }

  get #hsl(): HslType {
    if (_Hsl.is(this.#_hsl) !== true) {
      this.#_hsl = _Hsl.fromRgbComponents(this.toRgbComponents());
    }
    return this.#_hsl;
  }

  get hue(): _Type.degrees {
    return this.#hsl.h;
  }

  get saturation(): _Type.finite {
    return this.#hsl.s;
  }

  get lightness(): _Type.finite {
    return this.#hsl.l;
  }

  // get whiteness(): _Type.finite {
  //   return this.#hwb.w;
  // }

  // get blackness(): _Type.finite {
  //   return this.#hwb.b;
  // }

  static fromRgbComponents(rgb: RgbComponents): SRgbColor {
    _RgbComponents.assert(rgb, "Input");

    const normalized = _RgbComponents.normalize(
      rgb,
      _Rgb.COMPONENT_MIN,
      _Rgb.COMPONENT_MAX,
    );
    return new SRgbColor(normalized);
  }

  static fromRgb24(rgb24: Rgb24Components): SRgbColor {
    _Rgb24Components.assert(rgb24, "Input");

    const rgb = _Rgb24Components.toRgbComponents(rgb24);
    return new SRgbColor(rgb);
  }

  static fromBytes(bytes: _Type.Bytes): SRgbColor {
    _Assert.nonSharedUint8Array(bytes, "Input");
    if (bytes.byteLength < 3) {
      throw _Error.Type.mustBe("TODO", "Input");
    }

    return SRgbColor.fromRgb24({
      r: bytes[0],
      g: bytes[1],
      b: bytes[2],
    });
  }

  static fromHsl(hsl: HslType): SRgbColor {
    _Hsl.assert(hsl, "Input");
    const rgb = _Hsl.toRgbComponents(hsl);
    return new SRgbColor(rgb);
  }

  // toRgb24(): Rgb24Components {
  // }

  // toBytes(): _Type.Bytes {
  // }

  toHsl(): HslType {
    return { ...this.#hsl };
  }
}

export namespace SRgbColor {
  export type Hsl = HslType;
}
