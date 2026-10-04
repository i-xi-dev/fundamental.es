import * as Char16 from "../../textuals/char16.mts";
import * as Type from "../../type/mod.mts";
import * as TypeAlias from "../../_internal/type_alias/mod.mts";
import { Radix } from "../../numerics/radix.mts";

/** Bits per byte */
export const BITS = 8;

// export type ToStringOptions = {
//   radix?: Radix;
//   upperCase?: boolean;
//   minLength?: TypeAlias.safeint;
// };

// const _minPaddedLength = {
//   [Radix.BINARY]: 8,
//   [Radix.OCTAL]: 3,
//   [Radix.DECIMAL]: 3,
//   [Radix.HEXADECIMAL]: 2,
// } as const satisfies Record<Radix, TypeAlias.safeint>;

// function _resolveToStringOptions(
//   options?: ToStringOptions,
// ): Required<ToStringOptions> {
//   const radix = Object.values(Radix).includes(options?.radix as Radix)
//     ? options!.radix!
//     : Radix.HEXADECIMAL;
//   const upperCase = options?.upperCase === true;
//   let minLength = (Type.isNumber(options?.minLength) &&
//       SafeInt.isNonNegative(options.minLength))
//     ? options.minLength
//     : 0;
//   minLength = Math.max(minLength, _minPaddedLength[radix]);
//
//   return { radix, upperCase, minLength };
// }

export function toString(byte: TypeAlias.safeint): string {
  Type.Assert.uint8(byte, "Input");

  // const resolvedOptions = _resolveToStringOptions(options);
  // let str = byte.toString(resolvedOptions.radix);
  // if (resolvedOptions.upperCase === true) {
  //   str = str.toUpperCase();
  // }
  // return str.padStart(resolvedOptions.minLength, Char16.DIGIT_ZERO);

  return byte.toString(Radix.HEXADECIMAL).padStart(2, Char16.DIGIT_ZERO);
}

// function _isFormatMatch(radix: Radix, test: string): boolean {
//   switch (radix) {
//     case Radix.BINARY:
//       return /^[01]+$/.test(test);
//     case Radix.OCTAL:
//       return /^[0-7]+$/.test(test);
//     case Radix.DECIMAL:
//       return /^[0-9]+$/.test(test);
//     default:
//       return /^[0-9A-Fa-f]+$/.test(test);
//   }
// }

// export function fromString(str: string): Type.uint8 {
//   TextualTypeAssert.nonEmptyString(str, "Input");
//
//   const { radix } = _resolveFromStringOptions(options);
//
//   if (_isFormatMatch(radix, str) !== true) {
//     throw new Error("TODO");
//   }
//
//   return Number.parseInt(str, radix) as Type.uint8;
// }
