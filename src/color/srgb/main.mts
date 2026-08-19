import { _Assert, _Error, _Type } from "../../_common/mod.mts";
import { _Hsl, Hsl as _HslType } from "./hsl.mts";
import { _Hwb, Hwb as _HwbType } from "./hwb.mts";
import { _Rgb } from "./_rgb.mts";
import { _Rgb24, Rgb24 as _Rgb24Type } from "./rgb24.mts";
import { _RgbColor } from "../_rgb_color.mts";
import { _RgbComponents, RgbComponents } from "../rgb_components.mts";
import { StringUtils } from "../../_common/utils/mod.mts";

const _hexRegex = /^#?[0-9a-f]{6}$/i;

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
    if (bytes.byteLength !== 3) {
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

  static fromHexEncoded(hex: string): SRgbColor {
    _Assert.string(hex, "Input");
    if (_hexRegex.test(hex) !== true) {
      throw _Error.Type.mustBe(
        'a hexadecimal color value in the "RRGGBB" format',
        "Input",
      );
    }

    const [r, g, b] = Uint8Array.fromHex(hex.replace("#", StringUtils.EMPTY));
    return SRgbColor.fromRgb24({ r, g, b });
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

  toHexEncoded(): string {
    return this.toBytes().toHex();
  }

  // バイト列として等しければtrueとする
  // HSLに変換→HSLから再変換 だけで精度の問題で違う色判定になるので
  equals(other: SRgbColor): boolean { // 引数の型はSRgbColorのみとする（_Rgb24TypeとRgbComponentsなどの区別が付かないので）
    if ((other instanceof SRgbColor) !== true) {
      return false;
    }

    const { r: thisR, g: thisG, b: thisB } = this.#rgb24;
    const { r: otherR, g: otherG, b: otherB } = other.#rgb24;
    return (thisR === otherR) && (thisG === otherG) && (thisB === otherB);
  }

  #assert(test: unknown): asserts test is SRgbColor {
    if ((test instanceof SRgbColor) !== true) {
      throw _Error.Type.mustBe("a `SRgbColor` object", "Input");
    }
  }

  plusHue(relativeHue: _Type.degrees): SRgbColor {
    const { h, s, l } = this.#hsl;
    return SRgbColor.fromHsl({
      h: h + relativeHue,
      s,
      l,
    });
  }

  withHue(absoluteHue: _Type.degrees): SRgbColor {
    const { s, l } = this.#hsl;
    return SRgbColor.fromHsl({
      h: absoluteHue,
      s,
      l,
    });
  }

  plusSaturation(relativeSaturation: _Type.finite): SRgbColor {
    const { h, s, l } = this.#hsl;
    return SRgbColor.fromHsl({
      h,
      s: s + relativeSaturation,
      l,
    });
  }

  withSaturation(absoluteSaturation: _Type.finite): SRgbColor {
    const { h, l } = this.#hsl;
    return SRgbColor.fromHsl({
      h,
      s: absoluteSaturation,
      l,
    });
  }

  plusLightness(relativeLightness: _Type.finite): SRgbColor {
    const { h, s, l } = this.#hsl;
    return SRgbColor.fromHsl({
      h,
      s,
      l: l + relativeLightness,
    });
  }

  withLightness(absoluteLightness: _Type.finite): SRgbColor {
    const { h, s } = this.#hsl;
    return SRgbColor.fromHsl({
      h,
      s,
      l: absoluteLightness,
    });
  }

  //TODO ,toInverted,toComplementary,blend,...
}

export namespace SRgbColor {
  export type Hsl = _HslType;

  export namespace Hsl {
    export const fromRgbComponents = _Hsl.fromRgbComponents;
    export const toRgbComponents = _Hsl.toRgbComponents;
  }

  export type Hwb = _HwbType;

  export namespace Hwb {
    export const fromRgbComponents = _Hwb.fromRgbComponents;
    export const toRgbComponents = _Hwb.toRgbComponents;
  }

  export type Rgb24 = _Rgb24Type;

  export namespace Rgb24 {
    export const fromRgbComponents = _Rgb24.fromRgbComponents;
    export const toRgbComponents = _Rgb24.toRgbComponents;
  }
}

//TODO プレーンなrgbと、アルファ付き
