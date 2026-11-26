import { _mustBe } from "../../../_/_.mts";
import { _safeint } from "../_type_alias/_def/_defs.mts";

export function _mustBeUintN(bits: _safeint, target: string): TypeError {
  return _mustBe(`a ${bits}-bit unsigned integer of type \`number\``, target);
}
