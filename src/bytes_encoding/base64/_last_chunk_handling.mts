export const _LastChunkHandling = {
  LOOSE: "loose",
  STRICT: "strict",
  // STOP_BEFORE_PARTIAL: "stop-before-partial", // regulatorで調整しているので無意味
} as const;

export type _LastChunkHandling =
  typeof _LastChunkHandling[keyof typeof _LastChunkHandling];
