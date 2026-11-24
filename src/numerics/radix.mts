import type { _safeint } from "./_/_type_alias/_def/_defs.mts";

export const Radix = {
  BINARY: 2,
  OCTAL: 8,
  DECIMAL: 10,
  HEXADECIMAL: 16,
} as const satisfies Record<string, _safeint>;

export type Radix = typeof Radix[keyof typeof Radix];
