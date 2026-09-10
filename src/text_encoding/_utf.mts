import { Rune } from "../_common/mod.mts";

export const _BOM = "\u{FEFF}";

export function _regulateForEncoder(
  text: string,
  allowPending?: boolean,
): {
  textToEncode: string;
  pendingText: string | null;
} {
  if ((allowPending === true) && (text.length > 0)) {
    const lastChar = text.at(-1)!;
    if (Rune.isHighSurrogate(lastChar) === true) {
      return {
        textToEncode: text.slice(0, -1),
        pendingText: lastChar,
      };
    }
  }

  return { textToEncode: text, pendingText: null };
}
