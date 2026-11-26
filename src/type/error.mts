import type { _safeint } from "../numerics/_/_type_alias/_def/_defs.mts";
import { _mustBe } from "../_/_.mts";

export function mustBeBigUintN(
  bits: _safeint,
  target: string,
): TypeError {
  return _mustBe(`a ${bits}-bit unsigned integer of type \`bigint\``, target);
}

export function mustBeNonSharedUint8Array(target: string): TypeError {
  return _mustBe("an `Uint8Array` that references an `ArrayBuffer`", target);
}
