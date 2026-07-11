export const Radix = {
  BINARY: 2,
  OCTAL: 8,
  DECIMAL: 10,
  HEXADECIMAL: 16,
} as const;

export type Radix = typeof Radix[keyof typeof Radix];
