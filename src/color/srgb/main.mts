import { _Assert, _Error, _Type } from "../../_common/mod.mts";
import { _Hsl, Hsl as _HslType } from "./hsl.mts";
import { _Hwb, Hwb as _HwbType } from "./hwb.mts";
import { _Rgb } from "./_rgb.mts";
import { _Rgb24, Rgb24 as _Rgb24Type } from "./rgb24.mts";
import { _RgbColor } from "../_rgb_color.mts";
import { _RgbComponents, RgbComponents } from "../rgb_components.mts";

export class SRgbColor extends _RgbColor {
  #_rgb24: _Rgb24Type | null = null;
  #_hsl: _HslType | null = null;
  #_hwb: _HwbType | null = null;

  private constructor(rgb: RgbComponents) {
    super(rgb);
  }

  get #rgb24(): _Rgb24Type {
    if (_Rgb24.is(this.#_rgb24) !== true) {
      this.#_rgb24 = _Rgb24.fromRgbComponents(this.toRgbComponents());
    }
    return this.#_rgb24;
  }

  get #hsl(): _HslType {
    if (_Hsl.is(this.#_hsl) !== true) {
      this.#_hsl = _Hsl.fromRgbComponents(this.toRgbComponents());
    }
    return this.#_hsl;
  }

  get #hwb(): _HwbType {
    if (_Hwb.is(this.#_hwb) !== true) {
      this.#_hwb = _Hwb.fromRgbComponents(this.toRgbComponents());
    }
    return this.#_hwb;
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

  get whiteness(): _Type.finite {
    return this.#hwb.w;
  }

  get blackness(): _Type.finite {
    return this.#hwb.b;
  }

  static fromRgbComponents(rgb: RgbComponents): SRgbColor {
    _RgbComponents.assert(rgb, "Input");

    const normalized = _RgbComponents.normalize(
      rgb,
      _Rgb.COMPONENT_MIN,
      _Rgb.COMPONENT_MAX,
    );
    return new SRgbColor(normalized);
  }

  static fromRgb24(rgb24: _Rgb24Type): SRgbColor {
    _Rgb24.assert(rgb24, "Input");

    const rgb = _Rgb24.toRgbComponents(rgb24);
    return new SRgbColor(rgb);
  }

  static fromBytes(bytes: _Type.Bytes): SRgbColor {
    _Assert.nonSharedUint8Array(bytes, "Input");
    if (bytes.byteLength < 3) {
      throw _Error.Type.mustBe(
        // "an `Uint8Array` with a length of 3 or greater",
        "an `Uint8Array` with a length of 3",
        "Input",
      );
    }

    return SRgbColor.fromRgb24({
      r: bytes[0],
      g: bytes[1],
      b: bytes[2],
    });
  }

  static fromHsl(hsl: _HslType): SRgbColor {
    _Hsl.assert(hsl, "Input");
    const rgb = _Hsl.toRgbComponents(hsl);
    return new SRgbColor(rgb);
  }

  static fromHwb(hwb: _HwbType): SRgbColor {
    _Hwb.assert(hwb, "Input");
    const rgb = _Hwb.toRgbComponents(hwb);
    return new SRgbColor(rgb);
  }

  toRgb24(): _Rgb24Type {
    return { ...this.#rgb24 };
  }

  toBytes(): _Type.Bytes {
    const { r, g, b } = this.#rgb24;
    return Uint8Array.of(r, g, b);
  }

  // toUint8ClampedArray(): Uint8ClampedArray<ArrayBuffer> {
  //   const { r, g, b } = this.#rgb24;
  //   return Uint8ClampedArray.of(r, g, b);
  // }

  toHsl(): _HslType {
    return { ...this.#hsl };
  }

  toHwb(): _HwbType {
    return { ...this.#hwb };
  }
}

export namespace SRgbColor {
  export type Hsl = _HslType;
  export type Hwb = _HwbType;
  export type Rgb24 = _Rgb24Type;
}

//TODO プレーンなrgbと、アルファ付き
