export const Fallback = {
  EXCEPTION: Symbol("EXCEPTION"),
  REPLACEMENT: Symbol("REPLACEMENT"),
};

export type Fallback = typeof Fallback[keyof typeof Fallback];
