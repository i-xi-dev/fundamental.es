import type { _safeint } from "../_/_type_alias/_def/_defs.mts";

// for UintN.rotateLeft(x, offset)
export function _normalizeOffset(
  offset: _safeint,
  bitLength: _safeint,
): _safeint {
  const normalizedOffset = offset % bitLength;
  return (normalizedOffset < 0)
    ? (normalizedOffset + bitLength)
    : normalizedOffset;
}
