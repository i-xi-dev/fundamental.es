import * as TypeAlias from "../type_alias/mod.mts";

// for UintN.rotateLeft(x, offset)
export function _normalizeOffset(
  offset: TypeAlias.safeint,
  bitLength: TypeAlias.safeint,
): TypeAlias.safeint {
  const normalizedOffset = offset % bitLength;
  return (normalizedOffset < 0)
    ? (normalizedOffset + bitLength)
    : normalizedOffset;
}
