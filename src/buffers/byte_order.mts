export const ByteOrder = {
  BIG_ENDIAN: "big-endian",
  LITTLE_ENDIAN: "little-endian",
} as const;

export type ByteOrder = typeof ByteOrder[keyof typeof ByteOrder];
