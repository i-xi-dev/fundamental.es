export const RoundingMode = {
  CEIL: "ceil",

  EXPAND: "expand",

  FLOOR: "floor",

  HALF_CEIL: "halfCeil",

  HALF_EVEN: "halfEven",

  HALF_EXPAND: "halfExpand",

  HALF_FLOOR: "halfFloor",

  HALF_TRUNC: "halfTrunc",

  TRUNC: "trunc",
} as const;

export type RoundingMode = typeof RoundingMode[keyof typeof RoundingMode];
