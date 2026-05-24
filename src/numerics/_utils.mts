import { _T } from "../_common/mod.mts";

export function _normalizeOffset(
  offset: _T.safeint,
  bitLength: _T.safeint,
): _T.safeint {
  const normalizedOffset = offset % bitLength;
  return (normalizedOffset < 0)
    ? (normalizedOffset + bitLength)
    : normalizedOffset;
}
