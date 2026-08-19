import { _RgbComponents, RgbComponents } from "../rgb_components.mts";

const _COMPONENT_MIN = 0;

const _COMPONENT_MAX = 1;

export namespace _SRgbRgb {
  export function normalize(rgb: RgbComponents): RgbComponents {
    return _RgbComponents.normalize(rgb, _COMPONENT_MIN, _COMPONENT_MAX);
  }

  export function invert(rgb: RgbComponents): RgbComponents {
    return {
      r: _COMPONENT_MAX - rgb.r,
      g: _COMPONENT_MAX - rgb.g,
      b: _COMPONENT_MAX - rgb.b,
    };
  }
}
