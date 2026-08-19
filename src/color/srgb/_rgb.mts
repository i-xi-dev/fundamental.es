import { _RgbComponents, RgbComponents } from "../rgb_components.mts";

export namespace _SRgbRgb {
  export const COMPONENT_MIN = 0;

  export const COMPONENT_MAX = 1;

  export function normalize(rgb: RgbComponents): RgbComponents {
    return _RgbComponents.normalize(rgb, COMPONENT_MIN, COMPONENT_MAX);
  }

  export function invert(rgb: RgbComponents): RgbComponents {
    return {
      r: COMPONENT_MAX - rgb.r,
      g: COMPONENT_MAX - rgb.g,
      b: COMPONENT_MAX - rgb.b,
    };
  }
}
