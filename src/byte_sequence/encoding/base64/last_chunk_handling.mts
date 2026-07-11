export const LastChunkHandling = {
  LOOSE: "loose",
  STRICT: "strict",
  // STOP_BEFORE_PARTIAL: "stop-before-partial", // regulatorで調整しているので無意味
} as const;

export type LastChunkHandling =
  typeof LastChunkHandling[keyof typeof LastChunkHandling];
