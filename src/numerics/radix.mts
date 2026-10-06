import type { TypeAlias } from "../_internal/type_alias/mod.mts";

export const Radix = {
  BINARY: 2,
  OCTAL: 8,
  DECIMAL: 10,
  HEXADECIMAL: 16,
} as const satisfies Record<string, TypeAlias.safeint>;

export type Radix = typeof Radix[keyof typeof Radix];
