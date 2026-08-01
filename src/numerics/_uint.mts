import { _Type } from "../_common/mod.mts";

// for UintN.rotateLeft(x, offset)
export function _normalizeOffset(
  offset: _Type.safeint,
  bitLength: _Type.safeint,
): _Type.safeint {
  const normalizedOffset = offset % bitLength;
  return (normalizedOffset < 0)
    ? (normalizedOffset + bitLength)
    : normalizedOffset;
}
